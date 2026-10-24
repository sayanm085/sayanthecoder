import { projects } from "@/lib/projects";
import { servicePages } from "@/lib/services";

/** Keep evidence pages connected to the services they actually demonstrate. */
export function servicesForProject(projectId: string) {
  return servicePages.filter((service) =>
    service.projectIds.includes(projectId),
  );
}

export function relatedProjects(projectId: string, limit = 3) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return [];
  const services = servicesForProject(projectId);
  const tags = new Set(project.tags.map((tag) => tag.toLowerCase()));
  return projects
    .filter((item) => item.id !== projectId)
    .map((item) => ({
      project: item,
      score:
        (item.id === project.companionId ? 100 : 0) +
        services.filter((service) => service.projectIds.includes(item.id))
          .length *
          20 +
        item.tags.filter((tag) => tags.has(tag.toLowerCase())).length * 4 +
        (project.format === "game" && item.format === "game" ? 2 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.project.name.localeCompare(b.project.name),
    )
    .slice(0, limit)
    .map((item) => item.project);
}
