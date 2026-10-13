import { readFileSync } from "node:fs";
import { parse } from "yaml";

export interface Topic {
  key: string;
  label: string;
  description: string;
  scope: string;
  instructions: string[];
  tools: string[];
}

export interface TopicRule {
  topic: string;
  key: string;
  scope: string;
  rules: string[];
}

const read = (path: string) => parse(readFileSync(path, "utf8"));

export const agent = read("agent/agent.yaml").agent as {
  name: string;
  description: string;
  scope: string;
  global_rules: string[];
};
export const topics = read("agent/topics.yaml").topics as Topic[];
export const topicRules = read("agent/guardrails.yaml").guardrails.topic_rules as TopicRule[];
