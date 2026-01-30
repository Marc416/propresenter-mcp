import { LooksClient } from "../clients/looks.js";

export function createLooksHandlers(client: LooksClient) {
  return {
    looks_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    looks_get_current: async () => {
      const result = await client.getCurrent();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    looks_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    looks_trigger: async (args: { id: string }) => {
      await client.trigger(args.id);
      return { content: [{ type: "text" as const, text: `Triggered look: ${args.id}` }] };
    },
  };
}
