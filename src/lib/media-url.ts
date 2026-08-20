import productGranice from "@/assets/product-granice.jpg";
import productIgra from "@/assets/product-igra.jpg";
import freeGuide from "@/assets/free-guide.jpg";
import freeMaterijal from "@/assets/free-materijal.jpg";
import freeWebinar from "@/assets/free-webinar.jpg";

/** Images that already shipped with the site and stay bundled with the app. */
const bundledAssets: Record<string, string> = {
  "product-granice": productGranice,
  "product-igra": productIgra,
  "free-guide": freeGuide,
  "free-materijal": freeMaterijal,
  "free-webinar": freeWebinar,
};

/**
 * Resolves a stored media reference to a URL usable in the browser.
 * - `asset:<name>` → bundled illustration already used by the site
 * - `http(s)://…`  → external URL
 * - `/files/…`     → static file in /public
 * - anything else  → path inside the `content` storage bucket
 */
export function mediaUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("asset:")) return bundledAssets[value.slice(6)];
  if (/^https?:\/\//.test(value) || value.startsWith("/")) return value;
  return `/api/public/file/${value}`;
}
