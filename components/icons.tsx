export function Arrow({
  diagonal = true,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 1c2.3 14 8.8 20.5 23 23-14.2 2.5-20.7 9-23 23C21.7 33 15.2 26.5 1 24 15.2 21.5 21.7 15 24 1Z" />
    </svg>
  );
}

export function Brand({
  light = false,
  onClick,
  href = "#home",
}: {
  light?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string;
}) {
  return (
    <a
      className={`brand${light ? " brand-light" : ""}`}
      href={href}
      onClick={onClick}
      aria-label="SayanTheCoder home"
    >
      <span className="brand-symbol">
        <Spark />
      </span>
      <span>
        sayan<span className="brand-thin">the</span>coder
        <span className="brand-period">.</span>
      </span>
    </a>
  );
}

export function Close() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
