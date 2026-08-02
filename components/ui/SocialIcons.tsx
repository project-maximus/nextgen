import type { SVGProps } from "react";

/**
 * lucide-react no longer ships brand/logo glyphs, so these are small inline
 * SVGs for the social links in the footer (linking to the school's own
 * profiles — standard practice, not a trademark concern).
 */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.25-1.5 1.53-1.5H16.5V4.35C16.19 4.31 15.13 4.2 13.9 4.2c-2.5 0-4.2 1.53-4.2 4.32V10.5H7v3h2.7V21h3.8z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM20.5 21h-3.37v-6.4c0-1.52-.03-3.48-2.12-3.48-2.12 0-2.44 1.66-2.44 3.37V21H9.2V8.5h3.24v1.71h.05c.45-.85 1.56-1.75 3.2-1.75 3.43 0 4.06 2.26 4.06 5.2V21Z" />
    </svg>
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.6 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}
