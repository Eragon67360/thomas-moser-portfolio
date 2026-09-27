import type { Graph } from "schema-dts";

/**
 * Inline schema.org JSON-LD. Rendered on the server so crawlers that don't run
 * JavaScript still read it; `<` is escaped so content can't close the script tag.
 */
export function JsonLd({ data }: { data: Graph }) {
  return (
    <script
      type="application/ld+json"
      // oxlint-disable-next-line react/no-danger -- JSON-LD must be emitted verbatim; `<` is escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
