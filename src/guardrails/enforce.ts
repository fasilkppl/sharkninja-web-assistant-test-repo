import { type Topic } from "../agent/config";

const CARD_NUMBER = /\b(?:\d[ -]?){13,19}\b/;

/** Last check on a reply before it is sent to the customer. */
export function enforceGuardrails(topic: Topic, reply: string): string {
  if (CARD_NUMBER.test(reply)) {
    return "For your security I cannot show or repeat card details in this chat.";
  }
  if (topic.key === "product_safety" && !/unplug/i.test(reply)) {
    return `Please unplug the product and stop using it. ${reply}`;
  }
  return reply;
}
