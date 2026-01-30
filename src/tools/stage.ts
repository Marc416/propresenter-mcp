// Stage tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const stageTools: Tool[] = [
  {
    name: "stage_get_message",
    description: "Get the current stage message",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "stage_show_message",
    description: "Show a message on stage screens",
    inputSchema: {
      type: "object",
      properties: {
        message: {
          type: "object",
          description: "The message data to display",
        },
      },
      required: ["message"],
    },
  },
  {
    name: "stage_hide_message",
    description: "Hide the current stage message",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "stage_get_layout_map",
    description: "Get the current stage layout map configuration",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "stage_set_layout_map",
    description: "Set the stage layout map configuration",
    inputSchema: {
      type: "object",
      properties: {
        layoutMap: {
          type: "object",
          description: "The layout map configuration to set",
        },
      },
      required: ["layoutMap"],
    },
  },
  {
    name: "stage_get_screens",
    description: "Get all stage screens and their configurations",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "stage_get_screen_layout",
    description: "Get the layout for a specific stage screen",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the stage screen",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "stage_set_screen_layout",
    description: "Set the layout for a specific stage screen",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the stage screen",
        },
        layoutId: {
          type: "string",
          description: "The ID of the layout to apply",
        },
      },
      required: ["id", "layoutId"],
    },
  },
  {
    name: "stage_get_layouts",
    description: "Get all available stage layouts",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "stage_delete_layout",
    description: "Delete a specific stage layout",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the layout to delete",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "stage_get_layout_thumbnail",
    description: "Get thumbnail for a specific stage layout",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the layout",
        },
      },
      required: ["id"],
    },
  },
];
