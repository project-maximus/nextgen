import { isRateLimited, sendLead } from "@/lib/leads";
import { applicationSchema, requestInfoSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const isApplication =
    typeof body === "object" && body !== null && (body as { formType?: unknown }).formType === "application";
  const parsed = (isApplication ? applicationSchema : requestInfoSchema).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot field: real users never fill this in. Silently succeed so bots don't learn.
  if (parsed.data.honeypot) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendLead(parsed.data);
  } catch {
    return NextResponse.json(
      { error: "We couldn't submit your request. Please call us instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
