"""Read-only production crawl. Does not measure rankings or run a browser."""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urlparse
import json
import xml.etree.ElementTree as ET

ORIGIN = "https://www.sayanthecoder.in"


def fetch(url, agent="SayanPortfolioAudit/1.0"):
    try:
        response = urlopen(Request(url, headers={"User-Agent": agent}), timeout=30)
    except HTTPError as error:
        response = error
    with response:
        raw = response.read()
        return response.status, response.url, dict(response.headers), raw.decode("utf-8", "replace")


class Page(HTMLParser):
    def __init__(self, raw):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.h1 = 0
        self.canonical = []
        self.meta = {}
        self.links = []
        self.images = []
        self.schemas = []
        self.schema_errors = []
        self.in_schema = False
        self.buffer = ""
        self.feed(raw)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if tag == "meta":
            key = attrs.get("name", attrs.get("property", ""))
            value = attrs.get("content", "")
            self.meta[key] = (self.meta[key] + ", " + value) if key == "robots" and key in self.meta else value
        if tag == "link" and attrs.get("rel") == "canonical": self.canonical.append(attrs.get("href"))
        if tag == "a" and attrs.get("href"): self.links.append(attrs["href"])
        if tag == "img": self.images.append({key: attrs.get(key) for key in ("src", "alt", "width", "height", "loading")})
        if tag == "script" and attrs.get("type") == "application/ld+json": self.in_schema = True; self.buffer = ""

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_schema: self.buffer += data

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script" and self.in_schema:
            try: self.schemas.append(json.loads(self.buffer))
            except ValueError as error: self.schema_errors.append(str(error))
            self.in_schema = False


def inspect(url):
    status, final_url, headers, raw = fetch(url)
    page = Page(raw)
    return {"url": url, "status": status, "final_url": final_url,
            "title": page.title, "h1_count": page.h1, "canonical": page.canonical,
            "description": page.meta.get("description"), "robots": page.meta.get("robots"),
            "x_robots_tag": headers.get("X-Robots-Tag"), "html_bytes": len(raw.encode()),
            "schema_count": len(page.schemas), "schema_parse_errors": page.schema_errors,
            "images_missing_alt": [image["src"] for image in page.images if image["alt"] is None],
            "internal_links": list(dict.fromkeys(link for link in page.links if link.startswith("/") and not link.startswith("//")))}


if __name__ == "__main__":
    sitemap = fetch(ORIGIN + "/sitemap.xml")
    urls = [node.text for node in ET.fromstring(sitemap[3]).findall("{*}url/{*}loc")]
    robots = fetch(ORIGIN + "/robots.txt")
    with ThreadPoolExecutor(max_workers=3) as executor:
        pages = list(executor.map(inspect, urls))
    report = {"checked_at": datetime.now(timezone.utc).isoformat(),
              "scope": "Raw HTTP and server-rendered HTML; no browser, field performance, indexing or ranking measurements",
              "sitemap_status": sitemap[0], "sitemap_urls": urls,
              "robots_status": robots[0], "robots_txt": robots[3],
              "apex_final_url": fetch("https://sayanthecoder.in")[1],
              "pages": pages,
              "unknown_page": inspect(ORIGIN + "/audit-missing-page-20261024"),
              "crawler_user_agent_samples": {agent: fetch(ORIGIN, agent)[0] for agent in ("Googlebot", "bingbot", "OAI-SearchBot", "PerplexityBot")}}
    output = Path("docs/live-seo-recheck-2026-10-24.json")
    output.write_text(json.dumps(report, indent=2) + "\n")
    print(f"Saved {len(pages)} production pages to {output}")
    for page in pages:
        if page["status"] != 200 or page["canonical"] != [page["url"]] or page["h1_count"] != 1 or page["schema_parse_errors"]:
            print("Review:", page["url"], page["status"], page["canonical"], page["h1_count"])
