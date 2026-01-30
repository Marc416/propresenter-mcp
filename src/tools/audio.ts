// Audio tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const audioTools: Tool[] = [
  {
    name: "audio_get_playlists",
    description: "Get a list of all configured audio playlists",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_get_playlist",
    description: "Get all items in a specific audio playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist (UUID, name, or index)",
        },
        start: {
          type: "number",
          description: "Optional starting index for pagination (default: 0)",
        },
      },
      required: ["playlistId"],
    },
  },
  {
    name: "audio_get_playlist_updates",
    description: "Subscribe to updates for a specific audio playlist (chunked response)",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist (UUID, name, or index)",
        },
      },
      required: ["playlistId"],
    },
  },
  {
    name: "audio_get_focused_playlist",
    description: "Get the currently focused audio playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_get_active_playlist",
    description: "Get the currently active audio playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_focus_next_playlist",
    description: "Focus the next audio playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_focus_previous_playlist",
    description: "Focus the previous audio playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_focus_active_playlist",
    description: "Focus the active audio playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_focus_playlist",
    description: "Focus a specific audio playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist to focus",
        },
      },
      required: ["playlistId"],
    },
  },
  {
    name: "audio_trigger_focused_playlist",
    description: "Trigger the focused audio playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_trigger_active_playlist",
    description: "Trigger the active audio playlist (restart from beginning)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_trigger_playlist",
    description: "Trigger a specific audio playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist to trigger",
        },
      },
      required: ["playlistId"],
    },
  },
  {
    name: "audio_trigger_playlist_item",
    description: "Trigger a specific item in a specific playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
        itemId: {
          type: "string",
          description: "The ID of the item to trigger",
        },
      },
      required: ["playlistId", "itemId"],
    },
  },
  {
    name: "audio_trigger_focused_next",
    description: "Trigger the next item in the focused playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_trigger_focused_previous",
    description: "Trigger the previous item in the focused playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_trigger_active_next",
    description: "Trigger the next item in the active playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "audio_trigger_active_previous",
    description: "Trigger the previous item in the active playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
