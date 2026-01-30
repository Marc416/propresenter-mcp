// Clear tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const clearTools: Tool[] = [
  {
    name: "clear_layer",
    description: "Clear a specific layer (audio, props, messages, announcements, slide, media, video_input)",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["audio", "props", "messages", "announcements", "slide", "media", "video_input"],
          description: "The layer to clear",
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "clear_get_groups",
    description: "Get a list of all configured clear groups",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "clear_get_group",
    description: "Get details of a specific clear group",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the clear group (UUID, name, or index)",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "clear_trigger_group",
    description: "Trigger a specific clear group",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the clear group to trigger",
        },
      },
      required: ["id"],
    },
  },
];
