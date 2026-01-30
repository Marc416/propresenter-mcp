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
    name: "messages_show",
    description: "Show a specific message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to show",
        },
      },
      required: ["messageId"],
    },
  },
  {
    name: "messages_hide",
    description: "Hide all currently displayed messages",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "messages_trigger",
    description: "Trigger a specific message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to trigger",
        },
      },
      required: ["messageId"],
    },
  },
  {
    name: "messages_clear",
    description: "Clear a specific message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to clear",
        },
      },
      required: ["messageId"],
    },
  },
];
