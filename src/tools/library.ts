// Library tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const libraryTools: Tool[] = [
  {
    name: "library_get_libraries",
    description: "Get a list of all configured libraries",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "library_get",
    description: "Get all items in a specific library",
    inputSchema: {
      type: "object",
      properties: {
        libraryId: {
          type: "string",
          description: "The ID of the library (UUID, name, or index)",
        },
      },
      required: ["libraryId"],
    },
  },
  {
    name: "library_trigger_presentation",
    description: "Trigger the first cue of a presentation in a library",
    inputSchema: {
      type: "object",
      properties: {
        libraryId: {
          type: "string",
          description: "The ID of the library",
        },
        presentationId: {
          type: "string",
          description: "The ID of the presentation (UUID, name, or index)",
        },
      },
      required: ["libraryId", "presentationId"],
    },
  },
  {
    name: "library_trigger_presentation_cue",
    description: "Trigger a specific cue of a presentation in a library",
    inputSchema: {
      type: "object",
      properties: {
        libraryId: {
          type: "string",
          description: "The ID of the library",
        },
        presentationId: {
          type: "string",
          description: "The ID of the presentation",
        },
        index: {
          type: "number",
          description: "The index of the cue to trigger (0-based)",
        },
      },
      required: ["libraryId", "presentationId", "index"],
    },
  },
];
