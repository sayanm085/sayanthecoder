import { currencyForCountry } from "@/lib/budgets";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  // Vercel supplies this header. No IP is collected or sent to another provider.
  const currency = currencyForCountry(
    request.headers.get("x-vercel-ip-country"),
  );
  return Response.json(
    { currency },
    {
      headers: { "Cache-Control": "private, no-store, max-age=0" },
    },
  );
}
