import { PropsClient } from "../clients/props.js";

export function createPropsHandlers(client: PropsClient) {
  return {
    props_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_set: async (args: { id: string; prop: any }) => {
      await client.set(args.id, args.prop);
      return { content: [{ type: "text" as const, text: `Updated prop: ${args.id}` }] };
    },
    props_delete: async (args: { id: string }) => {
      await client.delete(args.id);
      return { content: [{ type: "text" as const, text: `Deleted prop: ${args.id}` }] };
    },
    props_trigger: async (args: { id: string }) => {
      await client.trigger(args.id);
      return { content: [{ type: "text" as const, text: `Triggered prop: ${args.id}` }] };
    },
    props_clear: async (args: { id: string }) => {
      await client.clear(args.id);
      return { content: [{ type: "text" as const, text: `Cleared prop: ${args.id}` }] };
    },
    props_pause_auto_clear: async (args: { id: string }) => {
      await client.pauseAutoClear(args.id);
      return { content: [{ type: "text" as const, text: `Paused auto-clear for prop: ${args.id}` }] };
    },
    props_resume_auto_clear: async (args: { id: string }) => {
      await client.resumeAutoClear(args.id);
      return { content: [{ type: "text" as const, text: `Resumed auto-clear for prop: ${args.id}` }] };
    },
    props_get_thumbnail: async (args: { id: string }) => {
      const result = await client.getThumbnail(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_get_collections: async () => {
      const result = await client.getCollections();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_create_collection: async (args: { name: string }) => {
      const result = await client.createCollection({ name: args.name });
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_get_collection: async (args: { id: string }) => {
      const result = await client.getCollection(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_set_collection: async (args: { id: string; collection: any }) => {
      await client.setCollection(args.id, args.collection);
      return { content: [{ type: "text" as const, text: `Updated prop collection: ${args.id}` }] };
    },
    props_delete_collection: async (args: { id: string }) => {
      await client.deleteCollection(args.id);
      return { content: [{ type: "text" as const, text: `Deleted prop collection: ${args.id}` }] };
    },
  };
}
