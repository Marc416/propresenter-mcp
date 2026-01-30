// Messages tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const messagesTools: Tool[] = [
  {
    name: "messages_get_all",
    description: "Get a list of all messages",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "messages_create",
    description: "Create a new message",
    inputSchema: {
      type: "object",
      properties: {
        message: {
          type: "object",
          description: "The message object with id, message text, tokens, theme, etc.",
        },
      },
      required: ["message"],
    },
  },
  {
    name: "messages_get",
    description: "Get details of a specific message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message",
        },
      },
      required: ["messageId"],
    },
  },
  {
    name: "messages_update",
    description: "Update an existing message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to update",
        },
        message: {
          type: "object",
          description: "The updated message object",
        },
      },
      required: ["messageId", "message"],
    },
  },
  {
    name: "messages_delete",
    description: "Delete a specific message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to delete",
        },
      },
      required: ["messageId"],
    },
  },
  {
    name: "messages_trigger",
    description: "Trigger (show) a specific message with optional token values",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to trigger",
        },
        tokens: {
          type: "array",
          description: "Optional array of token values to override defaults",
        },
      },
      required: ["messageId"],
    },
  },
  {
    name: "messages_clear",
    description: "Clear (hide) a specific message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to clear/hide",
        },
      },
      required: ["messageId"],
    },
  },
];
