import { createServer } from "node:http";
import { runTurn } from "./agent/turn";

const sessions = new Map<string, { role: string; content: string }[]>();

createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/chat") {
    response.writeHead(404).end();
    return;
  }
  let body = "";
  for await (const chunk of request) body += chunk;
  const { sessionId, message } = JSON.parse(body);
  const history = sessions.get(sessionId) ?? [];
  history.push({ role: "user", content: String(message) });
  const reply = await runTurn(sessionId, history);
  history.push({ role: "assistant", content: reply });
  sessions.set(sessionId, history);
  response.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ reply }));
}).listen(Number(process.env.PORT ?? 8080));
