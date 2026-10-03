import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is generated at build time and never revalidated, so the
// prerendered HTML is served read-only from Workers Static Assets — no R2/KV
// bucket to provision. Without this cache the SSG program pages 404, because
// the worker can't find their prerendered output.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
