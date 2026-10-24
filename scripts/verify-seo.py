# Run after npm run build. Checks local generated HTML, not live indexing.
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json
import xml.etree.ElementTree as ET
class Page(HTMLParser):
 def __init__(self,raw):
  super().__init__();self.title='';self.in_title=False;self.h1=0;self.canonical=[];self.meta={};self.ld=[];self.in_ld=False;self.buffer='';self.links=[];self.ids=set();self.feed(raw)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if t=='title':self.in_title=True
  if t=='h1':self.h1+=1
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a['href'])
  if t=='a' and a.get('href'):self.links.append(a['href'])
  if t=='script' and a.get('type')=='application/ld+json':self.in_ld=True;self.buffer=''
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
  if t=='script' and self.in_ld:self.ld.append(json.loads(self.buffer));self.in_ld=False
 def handle_data(self,d):
  if self.in_title:self.title+=d
  if self.in_ld:self.buffer+=d
base=Path('.next/server/app'); origin='https://www.sayanthecoder.in'
root=ET.fromstring((base/'sitemap.xml.body').read_text());urls=[n.text for n in root.findall('{*}url/{*}loc')]
assert len(urls)==len(set(urls))
pages={};titles=set()
for url in urls:
 path=urlparse(url).path.rstrip('/');file=base/((path.lstrip('/') if path else 'index')+'.html');raw=file.read_text();p=Page(raw)
 assert p.h1==1,(path,'H1 count',p.h1)
 assert p.title and p.title not in titles,(path,'title duplicate/missing');titles.add(p.title)
 assert p.meta.get('description'),(path,'missing description')
 assert p.canonical==[url],(path,p.canonical,url)
 assert p.meta.get('og:title') and p.meta.get('og:description'),path
 assert p.ld,(path,'no structured data')
 assert '127.0.0.1' not in raw and 'Shortlin' not in raw,path
 pages[path]=p
for path,p in pages.items():
 for link in p.links:
  u=urlparse(link)
  if link.startswith('/') and not link.startswith('//'):
   target=u.path.rstrip('/')
   if target.startswith('/assets/') or target.endswith('/opengraph-image'):continue
   if target.startswith('/resources/'):
    assert (Path('public')/target.lstrip('/')).is_file(),(path,'missing download',link)
    continue
   assert target in pages,(path,'unresolved route',link)
   if u.fragment:assert u.fragment in pages[target].ids,(path,'unresolved anchor',link)
assert all('/services/'+s in pages for s in ['devops-cloud-deployment','flutter-app-development','custom-software-ai-development'])
assert 'Sitemap: '+origin+'/sitemap.xml' in (base/'robots.txt.body').read_text()
assert pages[''].title=='Sayan Mondal | Web, App & DevOps Developer'
missing=Page((base/'_not-found.html').read_text())
assert not missing.canonical,'404 must not canonicalize to home'
assert 'noindex' in (base/'_not-found.html').read_text(),'404 must remain noindex'
assert '/services/website-web-app-development' in pages
assert '/services' in pages
assert '/insights/website-app-project-brief' in pages
reachable={''};pending=['']
while pending:
 current=pending.pop()
 for href in pages[current].links:
  u=urlparse(href);target=u.path.rstrip('/')
  if href.startswith('/') and target in pages and target not in reachable:
   reachable.add(target);pending.append(target)
assert reachable==set(pages),'Orphan pages: '+str(set(pages)-reachable)
print(f'{len(pages)} sitemap pages: unique titles, descriptions, canonicals, H1, social metadata and parsed JSON-LD passed.')
print('All internal page links and anchor targets resolve; service URLs are included in sitemap; robots sitemap uses production domain.')
