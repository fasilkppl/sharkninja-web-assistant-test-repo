import { agent, topics, topicRules, type Topic } from "./config";

/** The system prompt for one turn: who the assistant is, the topic it is in, and that topic's rules. */
export function buildSystemPrompt(topic: Topic): string {
  const rules = topicRules.find((rule) => rule.key === topic.key)?.rules ?? [];
  return [
    `You are ${agent.name}. ${agent.description}`,
    agent.scope,
    "Rules for every conversation:",
    ...agent.global_rules.map((rule) => `- ${rule}`),
    `Current topic: ${topic.label}. ${topic.scope}`,
    "How to work in this topic:",
    ...topic.instructions.map((line) => `- ${line}`),
    "What you must not do in this topic:",
    ...rules.map((rule) => `- ${rule}`),
  ].join("\n");
}

/** The prompt of the router model: one line per topic. */
export function buildRouterPrompt(): string {
  return [
    "Pick the one topic that fits the last customer message. Answer with its key only.",
    ...topics.map((topic) => `${topic.key}: ${topic.description}`),
  ].join("\n");
}
