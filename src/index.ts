#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Import clients
import { AnnouncementClient } from "./clients/announcement.js";
import { AudioClient } from "./clients/audio.js";
import { CaptureClient } from "./clients/capture.js";
import { ClearClient } from "./clients/clear.js";
import { LibraryClient } from "./clients/library.js";
import { LooksClient } from "./clients/looks.js";
import { MacrosClient } from "./clients/macros.js";
import { MessagesClient } from "./clients/messages.js";
import { PresentationClient } from "./clients/presentation.js";
import { StatusClient } from "./clients/status.js";
import { TimersClient } from "./clients/timers.js";
import { PlaylistsClient } from "./clients/playlists.js";
import { PropsClient } from "./clients/props.js";
import { StageClient } from "./clients/stage.js";
import { ThemesClient } from "./clients/themes.js";
import { TransportClient } from "./clients/transport.js";
import { GlobalGroupsClient } from "./clients/globalGroups.js";
import { MasksClient } from "./clients/masks.js";

// Import tools
import { announcementTools } from "./tools/announcement.js";
import { audioTools } from "./tools/audio.js";
import { captureTools } from "./tools/capture.js";
import { clearTools } from "./tools/clear.js";
import { libraryTools } from "./tools/library.js";
import { looksTools } from "./tools/looks.js";
import { macrosTools } from "./tools/macros.js";
import { messagesTools } from "./tools/messages.js";
import { presentationTools } from "./tools/presentation.js";
import { statusTools } from "./tools/status.js";
import { timersTools } from "./tools/timers.js";
import { playlistsTools } from "./tools/playlists.js";
import { propsTools } from "./tools/props.js";
import { stageTools } from "./tools/stage.js";
import { themesTools } from "./tools/themes.js";
import { transportTools } from "./tools/transport.js";
import { globalGroupsTools } from "./tools/globalGroups.js";
import { masksTools } from "./tools/masks.js";

// Import handlers
import { createAnnouncementHandlers } from "./handlers/announcement.js";
import { createAudioHandlers } from "./handlers/audio.js";
import { createCaptureHandlers } from "./handlers/capture.js";
import { createClearHandlers } from "./handlers/clear.js";
import { createLibraryHandlers } from "./handlers/library.js";
import { createLooksHandlers } from "./handlers/looks.js";
import { createMacrosHandlers } from "./handlers/macros.js";
import { createMessagesHandlers } from "./handlers/messages.js";
import { createPresentationHandlers } from "./handlers/presentation.js";
import { createStatusHandlers } from "./handlers/status.js";
import { createTimersHandlers } from "./handlers/timers.js";
import { createPlaylistsHandlers } from "./handlers/playlists.js";
import { createPropsHandlers } from "./handlers/props.js";
import { createStageHandlers } from "./handlers/stage.js";
import { createThemesHandlers } from "./handlers/themes.js";
import { createTransportHandlers } from "./handlers/transport.js";
import { createGlobalGroupsHandlers } from "./handlers/globalGroups.js";
import { createMasksHandlers } from "./handlers/masks.js";

// ProPresenter API base client
class ProPresenterClient {
  private baseUrl: string;
  private password: string;

  constructor(baseUrl: string, password: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.password = password;
  }

  async fetch(path: string, options: RequestInit = {}): Promise<any> {
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

const baseClient = new ProPresenterClient(PROPRESENTER_URL, PROPRESENTER_PASSWORD);
const fetchFn = baseClient.fetch.bind(baseClient);

// Initialize all API clients
const announcementClient = new AnnouncementClient(fetchFn);
const audioClient = new AudioClient(fetchFn);
const captureClient = new CaptureClient(fetchFn);
const clearClient = new ClearClient(fetchFn);
const libraryClient = new LibraryClient(fetchFn);
const looksClient = new LooksClient(fetchFn);
const macrosClient = new MacrosClient(fetchFn);
const messagesClient = new MessagesClient(fetchFn);
const presentationClient = new PresentationClient(fetchFn);
const statusClient = new StatusClient(fetchFn);
const timersClient = new TimersClient(fetchFn);
const playlistsClient = new PlaylistsClient(fetchFn);
const propsClient = new PropsClient(fetchFn);
const stageClient = new StageClient(fetchFn);
const themesClient = new ThemesClient(fetchFn);
const transportClient = new TransportClient(fetchFn);
const globalGroupsClient = new GlobalGroupsClient(fetchFn);
const masksClient = new MasksClient(fetchFn);

// Initialize all handlers
const announcementHandlers = createAnnouncementHandlers(announcementClient);
const audioHandlers = createAudioHandlers(audioClient);
const captureHandlers = createCaptureHandlers(captureClient);
const clearHandlers = createClearHandlers(clearClient);
const libraryHandlers = createLibraryHandlers(libraryClient);
const looksHandlers = createLooksHandlers(looksClient);
const macrosHandlers = createMacrosHandlers(macrosClient);
const messagesHandlers = createMessagesHandlers(messagesClient);
const presentationHandlers = createPresentationHandlers(presentationClient);
const statusHandlers = createStatusHandlers(statusClient);
const timersHandlers = createTimersHandlers(timersClient);
const playlistsHandlers = createPlaylistsHandlers(playlistsClient);
const propsHandlers = createPropsHandlers(propsClient);
const stageHandlers = createStageHandlers(stageClient);
const themesHandlers = createThemesHandlers(themesClient);
const transportHandlers = createTransportHandlers(transportClient);
const globalGroupsHandlers = createGlobalGroupsHandlers(globalGroupsClient);
const masksHandlers = createMasksHandlers(masksClient);

// Combine all handlers
const allHandlers = {
  ...announcementHandlers,
  ...audioHandlers,
  ...captureHandlers,
  ...clearHandlers,
  ...libraryHandlers,
  ...looksHandlers,
  ...macrosHandlers,
  ...messagesHandlers,
  ...presentationHandlers,
  ...statusHandlers,
  ...timersHandlers,
  ...playlistsHandlers,
  ...propsHandlers,
  ...stageHandlers,
  ...themesHandlers,
  ...transportHandlers,
  ...globalGroupsHandlers,
  ...masksHandlers,
};

// Combine all tools
const tools = [
  ...announcementTools,
  ...audioTools,
  ...captureTools,
  ...clearTools,
  ...libraryTools,
  ...looksTools,
  ...macrosTools,
  ...messagesTools,
  ...presentationTools,
  ...statusTools,
  ...timersTools,
  ...playlistsTools,
  ...propsTools,
  ...stageTools,
  ...themesTools,
  ...transportTools,
  ...globalGroupsTools,
  ...masksTools,
];

// Handle tool list requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    // Find the handler for this tool
    const handler = allHandlers[name as keyof typeof allHandlers];
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }

    // Execute the handler
    return await handler(args as any);
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
