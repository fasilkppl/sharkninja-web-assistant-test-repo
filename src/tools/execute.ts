import { toolByName } from "./definitions";
import { storeApi } from "../store/client";

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

/** Runs one tool call the model asked for against the store API. */
export async function executeTool(call: ToolCall, sessionId: string): Promise<unknown> {
  const tool = toolByName.get(call.name);
  if (!tool) {
    throw new Error(`unknown tool: ${call.name}`);
  }
  for (const key of tool.required) {
    if (call.arguments[key] === undefined) {
      throw new Error(`${call.name}: missing argument ${key}`);
    }
  }
  const [method, route] = tool.endpoint.split(" ");
  return storeApi.request(method, route, call.arguments, sessionId);
}
