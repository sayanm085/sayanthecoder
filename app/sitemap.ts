import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteOrigin } from "@/lib/site";
import { opslinGuidePath } from "@/lib/opslin-content";
import { servicePages } from "@/lib/services";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteOrigin, priority: 1 },
    { url: `${siteOrigin}${opslinGuidePath}`, priority: 0.8 },
    ...servicePages.map((service) => ({
      url: `${siteOrigin}/services/${service.slug}`,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteOrigin}/work/${project.id}`,
      priority: project.image ? 0.8 : 0.6,
    })),
  ];
}
