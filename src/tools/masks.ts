// Masks tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const masksTools: Tool[] = [
  {
    name: "masks_get_all",
    description: "Get all masks in the library",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "masks_get",
    description: "Get details of a specific mask",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the mask",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "masks_get_thumbnail",
    description: "Get thumbnail for a specific mask",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the mask",
        },
      },
      required: ["id"],
    },
  },
];
