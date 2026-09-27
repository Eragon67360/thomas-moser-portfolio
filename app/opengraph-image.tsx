import { site } from "@/config/site";
import { currentRole, intro } from "@/content/about";
import { ogImageSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = `${site.author}, ${intro.role}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: intro.role,
    title: site.author,
    subtitle: `Web and mobile apps, built end to end. ${currentRole.title} at ${currentRole.organization} (${currentRole.group}), ${currentRole.city}.`,
  });
}
