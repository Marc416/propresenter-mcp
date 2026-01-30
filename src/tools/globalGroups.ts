// Global Groups tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const globalGroupsTools: Tool[] = [
  {
    name: "global_groups_get_all",
    description: "Get all global groups configured in ProPresenter",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
