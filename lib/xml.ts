const XML_ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" };

/** Escape text for an XML element or attribute. */
export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char] ?? char);
}
