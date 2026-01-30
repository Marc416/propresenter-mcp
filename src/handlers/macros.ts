import { MacrosClient } from "../clients/macros.js";

export function createMacrosHandlers(client: MacrosClient) {
  return {
    macros_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    macros_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    macros_trigger: async (args: { id: string }) => {
      await client.trigger(args.id);
      return { content: [{ type: "text" as const, text: `Triggered macro: ${args.id}` }] };
    },
  };
}
