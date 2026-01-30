import { ClearClient } from "../clients/clear.js";

export function createClearHandlers(client: ClearClient) {
  return {
    clear_layer: async (args: { layer: string }) => {
      await client.clearLayer(args.layer as any);
      return { content: [{ type: "text" as const, text: `Cleared ${args.layer} layer` }] };
    },
    clear_get_groups: async () => {
      const result = await client.getGroups();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    clear_get_group: async (args: { id: string }) => {
      const result = await client.getGroup(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    clear_trigger_group: async (args: { id: string }) => {
      await client.triggerGroup(args.id);
      return { content: [{ type: "text" as const, text: `Triggered clear group: ${args.id}` }] };
    },
  };
}
