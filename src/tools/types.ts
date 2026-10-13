export interface ToolParameter {
  type: "string" | "number" | "boolean" | "object" | "string[]";
  description: string;
}

export interface ToolDefinition {
  /** What the model calls. */
  name: string;
  /** What people see in the chat and in reports. */
  label: string;
  description: string;
  /** The store API route behind the tool. */
  endpoint: string;
  parameters: Record<string, ToolParameter>;
  required: string[];
}
