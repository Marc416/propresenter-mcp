// Status tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const statusTools: Tool[] = [
  {
    name: "status_get_screens",
    description: "Get the current status of all screens in ProPresenter",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "status_get_audience",
    description: "Get the status of audience screens",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "status_get_stage",
    description: "Get the status of stage screens",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "status_get_layers",
    description: "Get the status of all layers",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
