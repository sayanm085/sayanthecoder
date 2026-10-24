import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

export const alt = "Product project by Sayan Mondal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function ProjectOpenGraph({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) return new Response("Not found", { status: 404 });
  const backgrounds: Record<string, string> = {
    freshcart: "#ffede7",
    dealker: "#eeebff",
    bakaloo: "#f2e6fb",
    radha: "#fff2dc",
    opslin: "#e9efff",
    lndry: "#eee7fa",
    "lndry-pos": "#e5f1ec",
    "bakaloo-platform": "#e8f3ed",
    rustbloom: "#f7efdd",
    antar: "#f3ead7",
    "agnix-studio": "#eee8f7",
  };
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: backgrounds[project.id] || "#f0edfa",
        color: "#263448",
        padding: "65px 75px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 23,
        }}
      >
        <span>sayanthecoder.</span>
        <span style={{ color: "#69718e" }}>{project.relationship}</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: project.name.length > 18 ? 64 : 100,
          lineHeight: 1.05,
          letterSpacing: -5,
          marginTop: 80,
        }}
      >
        {project.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          marginTop: 14,
          color: "#6c629d",
        }}
      >
        {project.headline}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          borderTop: "1px solid #26344825",
          paddingTop: 24,
          fontSize: 19,
        }}
      >
        <span>{project.category}</span>
        <span>Design & engineering by Sayan Mondal</span>
      </div>
    </div>,
    size,
  );
}
