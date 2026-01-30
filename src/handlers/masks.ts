import { MasksClient } from "../clients/masks.js";

export function createMasksHandlers(client: MasksClient) {
  return {
    masks_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    masks_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    masks_get_thumbnail: async (args: { id: string }) => {
      const result = await client.getThumbnail(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}
