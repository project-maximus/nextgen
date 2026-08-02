import type { RequestInfoInput } from "@/lib/validation";

/**
 * The single integration point for lead delivery. Currently logs/persists
 * the validated lead server-side — swap this implementation for a real
 * email/CRM provider (Resend, SendGrid, HubSpot, …) before relying on the
 * site for real lead capture. Every form posts through app/api/lead/route.ts,
 * which is the only caller of this function.
 */
export async function sendLead(lead: RequestInfoInput): Promise<void> {
  console.info("[lead:received]", {
    formType: lead.formType,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    programSlug: lead.programSlug,
    receivedAt: new Date().toISOString(),
  });
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * In-memory token bucket — sufficient for a single-instance deployment.
 * Move to a durable store (e.g. Upstash Redis) if this runs on multiple
 * instances or traffic grows enough that resets-on-deploy become a problem.
 */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}
