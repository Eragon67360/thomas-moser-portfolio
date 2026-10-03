/**
 * The single trust boundary for JSON over HTTP: callers state the shape they
 * expect from an upstream API or one of our own routes.
 */
export async function readJson<T>(response: Response): Promise<T> {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- response shape is the caller's contract
  return (await response.json()) as T;
}

/**
 * Throws on a non-2xx response. The unread body is cancelled first: a fetch whose
 * body is never consumed keeps its connection open, which in browsers leaves the
 * request pending (and `networkidle` unreachable) until garbage collection.
 */
export async function assertOk(response: Response, label: string): Promise<void> {
  if (response.ok) return;
  await response.body?.cancel().catch(() => undefined);
  throw new Error(`${label} responded with ${response.status}`);
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  // Strip the query string so API keys never end up in logs.
  await assertOk(response, `${init?.method ?? "GET"} ${url.split("?")[0]}`);
  return readJson<T>(response);
}
