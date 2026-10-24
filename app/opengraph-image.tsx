import { ImageResponse } from "next/og";

export const alt = "Sayan Mondal — Thoughtful design. Powerful engineering.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f5f0ff",
        color: "#263448",
        display: "flex",
        flexDirection: "column",
        padding: "65px 75px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          letterSpacing: -1,
        }}
      >
        <svg viewBox="0 0 48 48" width="30" height="30" fill="#d86b4d">
          <path d="M24 1c2.3 14 8.8 20.5 23 23-14.2 2.5-20.7 9-23 23C21.7 33 15.2 26.5 1 24 15.2 21.5 21.7 15 24 1Z" />
        </svg>
        sayanthecoder.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 78,
          letterSpacing: -4,
          lineHeight: 1.08,
          marginTop: 65,
        }}
      >
        <span style={{ color: "#5261d8" }}>Thoughtful design.</span>
        <span style={{ color: "#287967" }}>Powerful engineering.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #dcd8ed",
          paddingTop: 25,
          marginTop: "auto",
          fontSize: 19,
          color: "#6d7891",
        }}
      >
        <span>Sayan Mondal · Founder of Opslin & Shotlin</span>
        <span>Cloud / DevOps / AI</span>
      </div>
    </div>,
    size,
  );
}
