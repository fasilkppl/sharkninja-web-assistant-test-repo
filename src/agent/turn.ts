import { routeTopic } from "./router";
import { buildSystemPrompt } from "./prompt";
import { completeWithTools } from "../llm/client";
import { tools } from "../tools/definitions";
import { executeTool } from "../tools/execute";
import { enforceGuardrails } from "../guardrails/enforce";

const MAX_TOOL_ROUNDS = 4;

export async function runTurn(sessionId: string, history: { role: string; content: string }[]): Promise<string> {
  const topic = await routeTopic(history);
  const allowed = tools.filter((tool) => topic.tools.includes(tool.name));
  const messages = [...history];
  for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
    const reply = await completeWithTools({ system: buildSystemPrompt(topic), messages, tools: allowed });
    if (!reply.toolCalls.length) {
      return enforceGuardrails(topic, reply.text);
    }
    for (const call of reply.toolCalls) {
      const result = await executeTool(call, sessionId);
      messages.push({ role: "tool", content: JSON.stringify({ name: call.name, result }) });
    }
  }
  return enforceGuardrails(topic, "I could not finish that. Let me pass you to a member of our support team.");
}
