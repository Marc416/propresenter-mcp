import { MessagesClient } from "../clients/messages.js";

export function createMessagesHandlers(client: MessagesClient) {
  return {
    messages_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_create: async (args: { message: any }) => {
      const result = await client.create(args.message);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_get: async (args: { messageId: string }) => {
      const result = await client.get(args.messageId);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_update: async (args: { messageId: string; message: any }) => {
      const result = await client.update(args.messageId, args.message);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_delete: async (args: { messageId: string }) => {
      await client.delete(args.messageId);
      return { content: [{ type: "text" as const, text: `Deleted message: ${args.messageId}` }] };
    },
    messages_trigger: async (args: { messageId: string; tokens?: any[] }) => {
      await client.trigger(args.messageId, args.tokens);
      return { content: [{ type: "text" as const, text: `Triggered message: ${args.messageId}` }] };
    },
    messages_clear: async (args: { messageId: string }) => {
      await client.clear(args.messageId);
      return { content: [{ type: "text" as const, text: `Cleared message: ${args.messageId}` }] };
    },
  };
}
