// Looks tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const looksTools: Tool[] = [
  {
    name: "looks_get_all",
    description: "Get a list of all configured audience looks (except the live look)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "looks_get_current",
    description: "Get the details of the currently live audience look",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "looks_get",
    description: "Get details of a specific audience look",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the look (UUID, name, or index)",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "looks_trigger",
    description: "Trigger a specific audience look to make it live/current",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the look to trigger",
        },
      },
      required: ["id"],
    },
  },
];
