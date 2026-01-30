// Timers tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const timersTools: Tool[] = [
  {
    name: "timers_get_all",
    description: "Get all timers and their current states",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "timers_get",
    description: "Get details of a specific timer",
    inputSchema: {
      type: "object",
      properties: {
        timerId: {
          type: "string",
          description: "The ID of the timer",
        },
      },
      required: ["timerId"],
    },
  },
  {
    name: "timers_start",
    description: "Start a specific timer",
    inputSchema: {
      type: "object",
      properties: {
        timerId: {
          type: "string",
          description: "The ID of the timer to start",
        },
      },
      required: ["timerId"],
    },
  },
  {
    name: "timers_stop",
    description: "Stop a specific timer",
    inputSchema: {
      type: "object",
      properties: {
        timerId: {
          type: "string",
          description: "The ID of the timer to stop",
        },
      },
      required: ["timerId"],
    },
  },
  {
    name: "timers_reset",
    description: "Reset a specific timer",
    inputSchema: {
      type: "object",
      properties: {
        timerId: {
          type: "string",
          description: "The ID of the timer to reset",
        },
      },
      required: ["timerId"],
    },
  },
];
