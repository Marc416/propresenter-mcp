// Macros tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const macrosTools: Tool[] = [
  {
    name: "macros_get_all",
    description: "Get a list of all configured macros",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "macros_get",
    description: "Get details of a specific macro",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the macro (UUID, name, or index)",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "macros_trigger",
    description: "Trigger a specific macro",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the macro to trigger",
        },
      },
      required: ["id"],
    },
  },
];
