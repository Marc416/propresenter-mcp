// Transport tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const transportTools: Tool[] = [
  {
    name: "transport_play",
    description: "Play the specified layer (presentation, announcement, or audio)",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to play",
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "transport_pause",
    description: "Pause the specified layer (presentation, announcement, or audio)",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to pause",
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "transport_skip_backward",
    description: "Skip backward in the specified layer by a given time",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to skip backward in",
        },
        time: {
          type: "number",
          description: "Time in seconds to skip backward",
        },
      },
      required: ["layer", "time"],
    },
  },
  {
    name: "transport_skip_forward",
    description: "Skip forward in the specified layer by a given time",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to skip forward in",
        },
        time: {
          type: "number",
          description: "Time in seconds to skip forward",
        },
      },
      required: ["layer", "time"],
    },
  },
  {
    name: "transport_go_to_end",
    description: "Go to the end of content in the specified layer",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to go to end",
        },
        time: {
          type: "number",
          description: "Optional time parameter",
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "transport_get_time",
    description: "Get the current playback time of the specified layer",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to get time from",
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "transport_set_time",
    description: "Set the playback time of the specified layer",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to set time for",
        },
        time: {
          type: "number",
          description: "Time in seconds to set",
        },
      },
      required: ["layer", "time"],
    },
  },
  {
    name: "transport_get_auto_advance",
    description: "Get auto-advance status for presentation or announcement layer",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement"],
          description: "The layer to get auto-advance status from",
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "transport_cancel_auto_advance",
    description: "Cancel auto-advance for presentation or announcement layer",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement"],
          description: "The layer to cancel auto-advance for",
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "transport_get_current",
    description: "Get the current content on the specified layer",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          enum: ["presentation", "announcement", "audio"],
          description: "The layer to get current content from",
        },
      },
      required: ["layer"],
    },
  },
];
