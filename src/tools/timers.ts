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
    name: "timers_get_current",
    description: "Get the current/active timer",
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
  {
    name: "timers_operation",
    description: "Perform a specific operation on a timer (start, stop, reset)",
    inputSchema: {
      type: "object",
      properties: {
        timerId: {
          type: "string",
          description: "The ID of the timer",
        },
        operation: {
          type: "string",
          description: "The operation to perform: start, stop, or reset",
          enum: ["start", "stop", "reset"],
        },
      },
      required: ["timerId", "operation"],
    },
  },
  {
    name: "timers_operate_all",
    description: "Perform an operation on all timers simultaneously",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          description: "The operation to perform on all timers: start, stop, or reset",
          enum: ["start", "stop", "reset"],
        },
      },
      required: ["operation"],
    },
  },
  {
    name: "timers_get_system_time",
    description: "Get the current system time from ProPresenter",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "timers_get_video_countdown",
    description: "Get the video countdown timer information",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "timers_increment",
    description: "Increment a specific timer by a duration",
    inputSchema: {
      type: "object",
      properties: {
        timerId: {
          type: "string",
          description: "The ID of the timer to increment",
        },
        duration: {
          type: "number",
          description: "Duration to increment in seconds",
        },
      },
      required: ["timerId", "duration"],
    },
  },
];
