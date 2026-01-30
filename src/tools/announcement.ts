// Announcement tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const announcementTools: Tool[] = [
  {
    name: "announcement_get_active",
    description: "Get the currently active announcement presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "announcement_get_slide_index",
    description: "Get the index of the current slide within the active announcement",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "announcement_focus_active",
    description: "Focus the currently active announcement presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "announcement_trigger_active",
    description: "Retrigger the currently active announcement (starts from beginning)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "announcement_trigger_next",
    description: "Trigger the next cue in the active announcement",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "announcement_trigger_previous",
    description: "Trigger the previous cue in the active announcement",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "announcement_trigger_cue",
    description: "Trigger a specific cue by index in the active announcement",
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
    name: "announcement_timeline_operation",
    description: "Perform timeline operation (play, pause, rewind) on active announcement",
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
    name: "announcement_get_timeline_status",
    description: "Get the current timeline status of the active announcement",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
