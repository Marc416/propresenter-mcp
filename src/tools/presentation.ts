// Presentation tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const presentationTools: Tool[] = [
  {
    name: "trigger_presentation",
    description: "Trigger a specific presentation by UUID, optionally starting at a specific slide index",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation to trigger",
        },
        index: {
          type: "number",
          description: "Optional slide index to start at (0-based)",
        },
      },
      required: ["presentationUuid"],
    },
  },
  {
    name: "focus_presentation",
    description: "Focus a presentation without triggering it",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation to focus",
        },
      },
      required: ["presentationUuid"],
    },
  },
  {
    name: "get_focused_presentation",
    description: "Get the currently focused presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_active_presentation",
    description: "Get the currently active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_active_slide_index",
    description: "Get the index of the current slide within the active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "focus_active_presentation",
    description: "Focus the currently active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_active_presentation",
    description: "Retrigger the currently active presentation (starts from beginning)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_focused_presentation",
    description: "Trigger the currently focused presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_next_slide",
    description: "Trigger the next cue in the current presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_previous_slide",
    description: "Trigger the previous cue in the current presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_focused_next",
    description: "Trigger the next cue in the focused presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_focused_previous",
    description: "Trigger the previous slide in the focused presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_presentation_cue",
    description: "Trigger a specific cue by index in a presentation by UUID",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation",
        },
        index: {
          type: "number",
          description: "The index of the cue to trigger (0-based)",
        },
      },
      required: ["presentationUuid", "index"],
    },
  },
  {
    name: "trigger_focused_cue",
    description: "Trigger a specific cue by index in the focused presentation",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "The index of the cue to trigger (0-based)",
        },
      },
      required: ["index"],
    },
  },
  {
    name: "timeline_operation",
    description: "Perform timeline operation (play, pause, rewind) on active presentation",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["play", "pause", "rewind"],
          description: "The timeline operation to perform",
        },
      },
      required: ["operation"],
    },
  },
  {
    name: "get_timeline_status",
    description: "Get the current timeline status of the active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_focused_timeline_status",
    description: "Get the current timeline status of the focused presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "focused_timeline_operation",
    description: "Perform timeline operation (play, pause, rewind) on focused presentation",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["play", "pause", "rewind"],
          description: "The timeline operation to perform",
        },
      },
      required: ["operation"],
    },
  },
  {
    name: "presentation_timeline_operation",
    description: "Perform timeline operation on a specific presentation by UUID",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation",
        },
        operation: {
          type: "string",
          enum: ["play", "pause", "rewind"],
          description: "The timeline operation to perform",
        },
      },
      required: ["presentationUuid", "operation"],
    },
  },
  {
    name: "get_presentation",
    description: "Get details of a specific presentation by UUID",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation",
        },
      },
      required: ["presentationUuid"],
    },
  },
  {
    name: "get_presentation_thumbnail",
    description: "Get a thumbnail for a specific slide in a presentation",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation",
        },
        index: {
          type: "number",
          description: "The slide index (0-based)",
        },
        quality: {
          type: "number",
          description: "Optional quality setting for the thumbnail",
        },
      },
      required: ["presentationUuid", "index"],
    },
  },
  {
    name: "focus_next_presentation",
    description: "Focus the next presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "focus_previous_presentation",
    description: "Focus the previous presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_presentation_next",
    description: "Trigger the next cue in a specific presentation by UUID",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation",
        },
      },
      required: ["presentationUuid"],
    },
  },
  {
    name: "trigger_presentation_previous",
    description: "Trigger the previous cue in a specific presentation by UUID",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation",
        },
      },
      required: ["presentationUuid"],
    },
  },
  {
    name: "trigger_focused_group",
    description: "Trigger a specific group in the focused presentation",
    inputSchema: {
      type: "object",
      properties: {
        groupId: {
          type: "string",
          description: "The ID of the group to trigger",
        },
      },
      required: ["groupId"],
    },
  },
  {
    name: "trigger_active_group",
    description: "Trigger a specific group in the active presentation",
    inputSchema: {
      type: "object",
      properties: {
        groupId: {
          type: "string",
          description: "The ID of the group to trigger",
        },
      },
      required: ["groupId"],
    },
  },
  {
    name: "trigger_presentation_group",
    description: "Trigger a specific group in a presentation by UUID",
    inputSchema: {
      type: "object",
      properties: {
        presentationUuid: {
          type: "string",
          description: "The UUID of the presentation",
        },
        groupId: {
          type: "string",
          description: "The ID of the group to trigger",
        },
      },
      required: ["presentationUuid", "groupId"],
    },
  },
  {
    name: "get_chord_chart",
    description: "Get the current chord chart information",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_chord_chart_updates",
    description: "Get chord chart updates",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
