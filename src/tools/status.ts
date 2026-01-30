// Status tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const statusTools: Tool[] = [
  {
    name: "get_propresenter_version",
    description: "Get the ProPresenter version and build information",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "find_my_mouse",
    description: "Trigger the find my mouse feature to highlight the cursor on all screens",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
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
    name: "status_set_audience",
    description: "Set the configuration of audience screens",
    inputSchema: {
      type: "object",
      properties: {
        screens: {
          type: "object",
          description: "The screen configuration to apply",
        },
      },
      required: ["screens"],
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
    name: "status_set_stage",
    description: "Set the configuration of stage screens",
    inputSchema: {
      type: "object",
      properties: {
        screens: {
          type: "object",
          description: "The screen configuration to apply",
        },
      },
      required: ["screens"],
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
  {
    name: "status_get_slide",
    description: "Get the current slide status information",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "status_post_updates",
    description: "Subscribe to status updates with specific configuration",
    inputSchema: {
      type: "object",
      properties: {
        updates: {
          type: "object",
          description: "The update subscription configuration",
        },
      },
      required: ["updates"],
    },
  },
];
