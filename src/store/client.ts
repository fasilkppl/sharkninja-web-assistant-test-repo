const BASE_URL = process.env.STORE_API_URL ?? "http://localhost:4010";

function fill(route: string, args: Record<string, unknown>): string {
  return route.replace(/\{(\w+)\}/g, (_match, key) => encodeURIComponent(String(args[key] ?? args.order_number ?? "")));
}

export const storeApi = {
  async request(method: string, route: string, args: Record<string, unknown>, sessionId: string): Promise<unknown> {
    const url = new URL(fill(route, args), BASE_URL);
    const init: RequestInit = { method, headers: { "content-type": "application/json", "x-session-id": sessionId } };
    if (method === "GET") {
      for (const [key, value] of Object.entries(args)) url.searchParams.set(key, String(value));
    } else {
      init.body = JSON.stringify(args);
    }
    const response = await fetch(url, init);
    if (!response.ok) throw new Error(`store api ${response.status} on ${method} ${route}`);
    return response.json();
  },
};
