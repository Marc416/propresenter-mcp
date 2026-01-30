// Presentation tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const presentationTools: Tool[] = [
  {
    name: "presentation_get_focused",
    description: "Get the currently focused presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "presentation_get_active",
    description: "Get the currently active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "presentation_get_slide_index",
    description: "Get the index of the current slide within the active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "presentation_focus_active",
    description: "Focus the currently active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "presentation_trigger_active",
    description: "Retrigger the currently active presentation (starts from beginning)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "presentation_trigger_next",
    description: "Trigger the next cue in the active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "presentation_trigger_previous",
    description: "Trigger the previous cue in the active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "presentation_trigger_cue",
    description: "Trigger a specific cue by index in the active presentation",
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
    name: "presentation_timeline_operation",
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
    name: "presentation_get_timeline_status",
    description: "Get the current timeline status of the active presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
