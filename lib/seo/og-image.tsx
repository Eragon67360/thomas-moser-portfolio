import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogImageSize = { width: 1200, height: 630 };

const FONTS_DIR = path.join(process.cwd(), "assets", "fonts");
const ACCENT = "#ffbf00";

type OgImageInput = {
  kicker: string;
  title: string;
  subtitle?: string;
  /** Photo shown dimmed behind the text (post header). Must be PNG or JPEG. */
  background?: string;
};

/** Social card in the site's look: dark ground, amber accent, JetBrains Mono title. */
export async function renderOgImage({ kicker, title, subtitle, background }: OgImageInput): Promise<ImageResponse> {
  const [mono, sans] = await Promise.all([
    readFile(path.join(FONTS_DIR, "JetBrainsMono-ExtraBold.ttf")),
    readFile(path.join(FONTS_DIR, "Inter-Regular.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "#fff",
        fontFamily: "Inter",
        background: "radial-gradient(900px 500px at 0% 0%, rgba(255, 191, 0, 0.22), transparent 70%), #16181d",
      }}
    >
      {background && (
        // oxlint-disable-next-line nextjs/no-img-element -- next/og renders plain <img>; next/image does not apply.
        <img
          src={background}
          alt=""
          width={ogImageSize.width}
          height={ogImageSize.height}
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover", opacity: 0.3 }}
        />
      )}
      {background && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogImageSize.width,
            height: ogImageSize.height,
            background: "linear-gradient(90deg, rgba(22, 24, 29, 0.92) 0%, rgba(22, 24, 29, 0.55) 100%)",
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 18, color: ACCENT, fontFamily: "JetBrains Mono" }}>
        <div style={{ width: 48, height: 6, borderRadius: 3, background: ACCENT }} />
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase" }}>{kicker}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: title.length > 48 ? 54 : 66, lineHeight: 1.1 }}>
          {title}
        </div>
        {subtitle && <div style={{ fontSize: 30, color: "#c9ccd6", lineHeight: 1.35 }}>{subtitle}</div>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9da1ad" }}>
        <div style={{ color: "#fff", fontFamily: "JetBrains Mono" }}>{site.author}</div>
        <div>{site.name}</div>
      </div>
    </div>,
    {
      ...ogImageSize,
      fonts: [
        { name: "JetBrains Mono", data: mono, weight: 800, style: "normal" },
        { name: "Inter", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
