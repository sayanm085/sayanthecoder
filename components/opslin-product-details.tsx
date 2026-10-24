import Link from "next/link";
import { opslinFaqs, opslinGuidePath } from "@/lib/opslin-content";

export function OpslinProductDetails() {
  return (
    <section
      className="opslin-explainer"
      aria-labelledby="opslin-explainer-title"
    >
      <div className="section-label">Opslin / Product overview</div>
      <h2 id="opslin-explainer-title">
        From your code to a monitored release.
      </h2>
      <p>
        Opslin is the independent deployment product I founded. It brings cloud
        infrastructure operations into a guided workflow on your own Linux VPS:
        connect a server, configure an app, deploy a release, then inspect its
        health from the same dashboard.
      </p>
      <ol className="opslin-workflow">
        <li>
          <strong>Connect your VPS.</strong> Use the dashboard-generated setup
          command to connect the outbound agent.
        </li>
        <li>
          <strong>Bring your application.</strong> Connect GitHub or upload
          code, then configure runtime settings, secrets and your domain.
        </li>
        <li>
          <strong>Deploy and validate.</strong> Follow the build, release and
          health-check workflow; review SSL and application logs.
        </li>
        <li>
          <strong>Operate with context.</strong> Check servers, databases,
          metrics and alerts, and use release rollback when appropriate.
        </li>
      </ol>
      <h3>AI-assisted operations with MCP beta</h3>
      <p>
        A compatible AI assistant can inspect a release, read logs, check health
        and perform supported deploy or rollback actions through Opslin MCP. You
        control the available permissions. The deployment platform and MCP are
        in beta; Launchpad and Marketplace are coming soon.
      </p>
      <Link className="text-link" href={opslinGuidePath}>
        Read the founder’s guide to Opslin, VPS deployment and AI-assisted
        DevOps →
      </Link>
      <h3>Questions about Opslin</h3>
      <div className="opslin-faqs">
        {opslinFaqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
