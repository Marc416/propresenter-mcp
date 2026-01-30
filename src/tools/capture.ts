// Capture tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const captureTools: Tool[] = [
  {
    name: "capture_get_status",
    description: "Get the current capture status and capture time",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "capture_operation",
    description: "Perform a capture operation (start or stop)",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["start", "stop"],
          description: "The capture operation to perform",
        },
      },
      required: ["operation"],
    },
  },
  {
    name: "capture_get_settings",
    description: "Get the current capture settings",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "capture_get_encodings",
    description: "Get available capture encodings for a specific type",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["disk", "rtmp", "resi"],
          description: "The capture type to get encodings for",
        },
      },
      required: ["type"],
    },
  },
];
