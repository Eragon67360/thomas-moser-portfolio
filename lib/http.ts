/**
 * The single trust boundary for JSON over HTTP: callers state the shape they
 * expect from an upstream API or one of our own routes.
 */
export async function readJson<T>(response: Response): Promise<T> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- response shape is the caller's contract
  return (await response.json()) as T;
}

export function assertOk(response: Response, label: string): void {
  if (!response.ok) throw new Error(`${label} responded with ${response.status}`);
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  // Strip the query string so API keys never end up in logs.
  assertOk(response, `${init?.method ?? "GET"} ${url.split("?")[0]}`);
  return readJson<T>(response);
}
