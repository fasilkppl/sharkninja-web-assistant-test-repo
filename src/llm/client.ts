import type { ToolDefinition } from "../tools/types";
import type { ToolCall } from "../tools/execute";

const LLM_URL = process.env.LLM_GATEWAY_URL ?? "http://localhost:4000/v1/chat/completions";
const MODEL = process.env.LLM_MODEL ?? "gpt-5.5";

interface Request {
  system: string;
  messages: { role: string; content: string }[];
  maxTokens?: number;
  tools?: ToolDefinition[];
}

async function call(request: Request): Promise<any> {
  const response = await fetch(LLM_URL, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.LLM_GATEWAY_KEY ?? ""}` },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: request.maxTokens ?? 600,
      messages: [{ role: "system", content: request.system }, ...request.messages],
      tools: request.tools?.map((tool) => ({
        type: "function",
        function: { name: tool.name, description: tool.description, parameters: { type: "object", properties: tool.parameters, required: tool.required } },
      })),
    }),
  });
  if (!response.ok) throw new Error(`llm gateway ${response.status}`);
  return (await response.json()).choices[0].message;
}

export async function complete(request: Request): Promise<string> {
  return (await call(request)).content ?? "";
}

export async function completeWithTools(request: Request): Promise<{ text: string; toolCalls: ToolCall[] }> {
  const message = await call(request);
  const toolCalls = (message.tool_calls ?? []).map((item: any) => ({
    name: item.function.name,
    arguments: JSON.parse(item.function.arguments || "{}"),
  }));
  return { text: message.content ?? "", toolCalls };
}
