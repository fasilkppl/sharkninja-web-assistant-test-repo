import { topics, type Topic } from "./config";
import { buildRouterPrompt } from "./prompt";
import { complete } from "../llm/client";

const FALLBACK = "live_agent_handoff";

/** Classifies the conversation into one topic. An answer that is no topic key goes to the handoff topic. */
export async function routeTopic(history: { role: string; content: string }[]): Promise<Topic> {
  const answer = await complete({ system: buildRouterPrompt(), messages: history.slice(-6), maxTokens: 20 });
  const key = answer.trim().toLowerCase();
  return topics.find((topic) => topic.key === key) ?? topics.find((topic) => topic.key === FALLBACK)!;
}
