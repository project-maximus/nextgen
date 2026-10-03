import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "www.nextgenhealthinstitute.com";
const BARE_HOST = "nextgenhealthinstitute.com";

/**
 * One website, one address. Search engines should only ever index
 * https://www.nextgenhealthinstitute.com:
 *  - the bare domain permanently redirects to www;
 *  - preview hosts (*.workers.dev, *.vercel.app) serve the site but are
 *    marked noindex so they never compete with the real domain.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];

  if (host === BARE_HOST) {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`https://${CANONICAL_HOST}${pathname}${search}`, 308);
  }

  if (host.endsWith(".workers.dev") || host.endsWith(".vercel.app")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Pages and data routes only — static files don't need host handling.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|logos/|og/).*)"],
};
