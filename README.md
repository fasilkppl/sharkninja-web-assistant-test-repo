# Web shopping assistant (synthetic test repo)

**This is test data.** It was written to test a tool that reads a chat agent's source code.
It is **not** SharkNinja's code, it is not affiliated with or endorsed by SharkNinja, and every
policy, limit and rule in it (return windows, refund limits, warranty terms and so on) is
**invented**. Do not rely on anything here as a statement about the real company.

## What is in it

A small web chat assistant for a store that sells Shark and Ninja products.

| Path | What it holds |
|---|---|
| `agent/agent.yaml` | Name, description, scope and the rules for every conversation |
| `agent/topics.yaml` | 14 topics: when to route there and how to work in it |
| `agent/guardrails.yaml` | What the assistant must not do, per topic |
| `src/tools/definitions.ts` | 36 tools the model can call |
| `src/agent/` | Router, prompt builder and the turn loop |
| `src/guardrails/enforce.ts` | Last check on a reply before it is sent |
| `src/server.ts` | `POST /chat` |

## Run

```
npm install
STORE_API_URL=http://localhost:4010 LLM_GATEWAY_URL=http://localhost:4000/v1/chat/completions npm start
```
