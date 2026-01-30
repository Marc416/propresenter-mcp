#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

// ProPresenter API client
class ProPresenterClient {
  private baseUrl: string;
  private password: string;

  constructor(baseUrl: string, password: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.password = password;
  }

  private async fetch(path: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`ProPresenter API error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  // Status and Information
  async getVersion(): Promise<any> {
    return this.fetch("/v1/version");
  }

  async getStatus(): Promise<any> {
    return this.fetch("/v1/status/screens");
  }

  // Presentation Controls
  async getPresentations(): Promise<any> {
    return this.fetch("/v1/library");
  }

  async triggerPresentation(presentationPath: string, index?: number): Promise<any> {
    const params = index !== undefined ? `?index=${index}` : "";
    return this.fetch(`/v1/presentation/${encodeURIComponent(presentationPath)}/trigger${params}`, {
      method: "GET",
    });
  }

  async focusPresentation(presentationPath: string): Promise<any> {
    return this.fetch(`/v1/presentation/${encodeURIComponent(presentationPath)}/focus`, {
      method: "GET",
    });
  }

  // Slide Controls
  async triggerNext(): Promise<any> {
    return this.fetch("/v1/trigger/next", { method: "GET" });
  }

  async triggerPrevious(): Promise<any> {
    return this.fetch("/v1/trigger/previous", { method: "GET" });
  }

  async triggerSlide(index: number): Promise<any> {
    return this.fetch(`/v1/trigger/slide/${index}`, { method: "GET" });
  }

  // Clear Controls
  async clearAll(): Promise<any> {
    return this.fetch("/v1/clear/all", { method: "GET" });
  }

  async clearLayer(layer: string): Promise<any> {
    return this.fetch(`/v1/clear/${layer}`, { method: "GET" });
  }

  // Timer Controls
  async getTimers(): Promise<any> {
    return this.fetch("/v1/timers");
  }

  async startTimer(timerId: string): Promise<any> {
    return this.fetch(`/v1/timer/${timerId}/start`, { method: "GET" });
  }

  async stopTimer(timerId: string): Promise<any> {
    return this.fetch(`/v1/timer/${timerId}/stop`, { method: "GET" });
  }

  async resetTimer(timerId: string): Promise<any> {
    return this.fetch(`/v1/timer/${timerId}/reset`, { method: "GET" });
  }

  // Message Controls
  async showMessage(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${messageId}`, { method: "GET" });
  }

  async hideMessages(): Promise<any> {
    return this.fetch("/v1/message/hide", { method: "GET" });
  }
}

// MCP Server
const server = new Server(
  {
    name: "mcp-propresenter",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Get ProPresenter connection details from environment variables
const PROPRESENTER_URL = process.env.PROPRESENTER_URL || "http://localhost:50000";
const PROPRESENTER_PASSWORD = process.env.PROPRESENTER_PASSWORD || "";

const client = new ProPresenterClient(PROPRESENTER_URL, PROPRESENTER_PASSWORD);

// Define available tools
const tools: Tool[] = [
  {
    name: "get_propresenter_version",
    description: "Get the ProPresenter version and build information",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_screen_status",
    description: "Get the current status of all screens in ProPresenter",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_presentations",
    description: "List all available presentations in the ProPresenter library",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_presentation",
    description: "Trigger a specific presentation by path, optionally starting at a specific slide index",
    inputSchema: {
      type: "object",
      properties: {
        presentationPath: {
          type: "string",
          description: "The path to the presentation file",
        },
        index: {
          type: "number",
          description: "Optional slide index to start at (0-based)",
        },
      },
      required: ["presentationPath"],
    },
  },
  {
    name: "focus_presentation",
    description: "Focus a presentation without triggering it",
    inputSchema: {
      type: "object",
      properties: {
        presentationPath: {
          type: "string",
          description: "The path to the presentation file",
        },
      },
      required: ["presentationPath"],
    },
  },
  {
    name: "trigger_next_slide",
    description: "Trigger the next slide in the current presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_previous_slide",
    description: "Trigger the previous slide in the current presentation",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "trigger_slide_by_index",
    description: "Trigger a specific slide by its index",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "The slide index (0-based)",
        },
      },
      required: ["index"],
    },
  },
  {
    name: "clear_all",
    description: "Clear all layers (video, audio, props, announcements)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "clear_layer",
    description: "Clear a specific layer",
    inputSchema: {
      type: "object",
      properties: {
        layer: {
          type: "string",
          description: "The layer to clear (video, audio, props, announcements)",
          enum: ["video", "audio", "props", "announcements"],
        },
      },
      required: ["layer"],
    },
  },
  {
    name: "get_timers",
    description: "Get all timers and their current states",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "start_timer",
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
    name: "stop_timer",
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
    name: "reset_timer",
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
    name: "show_message",
    description: "Show a specific message",
    inputSchema: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "The ID of the message to show",
        },
      },
      required: ["messageId"],
    },
  },
  {
    name: "hide_messages",
    description: "Hide all currently displayed messages",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// Handle tool list requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "get_propresenter_version": {
        const result = await client.getVersion();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_screen_status": {
        const result = await client.getStatus();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "list_presentations": {
        const result = await client.getPresentations();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "trigger_presentation": {
        const { presentationPath, index } = args as {
          presentationPath: string;
          index?: number;
        };
        const result = await client.triggerPresentation(presentationPath, index);
        return {
          content: [
            {
              type: "text",
              text: `Triggered presentation: ${presentationPath}${index !== undefined ? ` at slide ${index}` : ""}`,
            },
          ],
        };
      }

      case "focus_presentation": {
        const { presentationPath } = args as { presentationPath: string };
        const result = await client.focusPresentation(presentationPath);
        return {
          content: [
            { type: "text", text: `Focused presentation: ${presentationPath}` },
          ],
        };
      }

      case "trigger_next_slide": {
        await client.triggerNext();
        return {
          content: [{ type: "text", text: "Triggered next slide" }],
        };
      }

      case "trigger_previous_slide": {
        await client.triggerPrevious();
        return {
          content: [{ type: "text", text: "Triggered previous slide" }],
        };
      }

      case "trigger_slide_by_index": {
        const { index } = args as { index: number };
        await client.triggerSlide(index);
        return {
          content: [{ type: "text", text: `Triggered slide at index ${index}` }],
        };
      }

      case "clear_all": {
        await client.clearAll();
        return {
          content: [{ type: "text", text: "Cleared all layers" }],
        };
      }

      case "clear_layer": {
        const { layer } = args as { layer: string };
        await client.clearLayer(layer);
        return {
          content: [{ type: "text", text: `Cleared ${layer} layer` }],
        };
      }

      case "get_timers": {
        const result = await client.getTimers();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "start_timer": {
        const { timerId } = args as { timerId: string };
        await client.startTimer(timerId);
        return {
          content: [{ type: "text", text: `Started timer: ${timerId}` }],
        };
      }

      case "stop_timer": {
        const { timerId } = args as { timerId: string };
        await client.stopTimer(timerId);
        return {
          content: [{ type: "text", text: `Stopped timer: ${timerId}` }],
        };
      }

      case "reset_timer": {
        const { timerId } = args as { timerId: string };
        await client.resetTimer(timerId);
        return {
          content: [{ type: "text", text: `Reset timer: ${timerId}` }],
        };
      }

      case "show_message": {
        const { messageId } = args as { messageId: string };
        await client.showMessage(messageId);
        return {
          content: [{ type: "text", text: `Showed message: ${messageId}` }],
        };
      }

      case "hide_messages": {
        await client.hideMessages();
        return {
          content: [{ type: "text", text: "Hid all messages" }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ProPresenter MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
