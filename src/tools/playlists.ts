// Playlists tool definitions
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const playlistsTools: Tool[] = [
  {
    name: "playlists_get_all",
    description: "Get all playlists in the library",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_create",
    description: "Create a new playlist",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the new playlist",
        },
        type: {
          type: "string",
          description: "The type of playlist (e.g., 'group', 'playlist')",
        },
      },
      required: ["name", "type"],
    },
  },
  {
    name: "playlists_get",
    description: "Get details of a specific playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
      },
      required: ["playlistId"],
    },
  },
  {
    name: "playlists_set",
    description: "Update the contents of a specific playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
        contents: {
          type: "object",
          description: "The playlist contents to set",
        },
      },
      required: ["playlistId", "contents"],
    },
  },
  {
    name: "playlists_create_under",
    description: "Create a new playlist under an existing playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The parent playlist ID",
        },
        name: {
          type: "string",
          description: "The name of the new playlist",
        },
        type: {
          type: "string",
          description: "The type of playlist",
        },
      },
      required: ["playlistId", "name", "type"],
    },
  },
  {
    name: "playlists_get_active",
    description: "Get the currently active playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_get_active_presentation_thumbnail",
    description: "Get thumbnail for active playlist presentation item",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "The item index",
        },
        cueIndex: {
          type: "number",
          description: "The cue index within the item",
        },
      },
      required: ["index", "cueIndex"],
    },
  },
  {
    name: "playlists_get_active_announcement_thumbnail",
    description: "Get thumbnail for active playlist announcement item",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "The item index",
        },
        cueIndex: {
          type: "number",
          description: "The cue index within the item",
        },
      },
      required: ["index", "cueIndex"],
    },
  },
  {
    name: "playlists_trigger_active_presentation",
    description: "Trigger the active presentation in the playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_trigger_active_announcement",
    description: "Trigger the active announcement in the playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_trigger_active_presentation_item",
    description: "Trigger a specific presentation item in the active playlist",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "The item index to trigger",
        },
      },
      required: ["index"],
    },
  },
  {
    name: "playlists_trigger_active_announcement_item",
    description: "Trigger a specific announcement item in the active playlist",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "The item index to trigger",
        },
      },
      required: ["index"],
    },
  },
  {
    name: "playlists_focus_active_presentation",
    description: "Focus the active presentation playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_focus_active_announcement",
    description: "Focus the active announcement playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_get_focused",
    description: "Get the currently focused playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_trigger_focused",
    description: "Trigger the focused playlist item",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_trigger_focused_item",
    description: "Trigger a specific item in the focused playlist",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "The item index to trigger",
        },
      },
      required: ["index"],
    },
  },
  {
    name: "playlists_get_focused_next",
    description: "Get the next item in the focused playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_get_focused_previous",
    description: "Get the previous item in the focused playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_trigger_focused_next",
    description: "Trigger the next item in the focused playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_trigger_focused_previous",
    description: "Trigger the previous item in the focused playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_focus_next",
    description: "Focus the next playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_focus_previous",
    description: "Focus the previous playlist",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "playlists_focus",
    description: "Focus a specific playlist without triggering it",
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
    name: "playlists_trigger",
    description: "Trigger a specific playlist",
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
    name: "playlists_trigger_next",
    description: "Trigger the next item in a specific playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
      },
      required: ["playlistId"],
    },
  },
  {
    name: "playlists_trigger_previous",
    description: "Trigger the previous item in a specific playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
      },
      required: ["playlistId"],
    },
  },
  {
    name: "playlists_trigger_item",
    description: "Trigger a specific item in a playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
        index: {
          type: "number",
          description: "The item index to trigger",
        },
      },
      required: ["playlistId", "index"],
    },
  },
  {
    name: "playlists_get_thumbnail",
    description: "Get thumbnail for a specific playlist item",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
        index: {
          type: "number",
          description: "The item index",
        },
        cueIndex: {
          type: "number",
          description: "The cue index within the item",
        },
      },
      required: ["playlistId", "index", "cueIndex"],
    },
  },
  {
    name: "playlists_get_updates",
    description: "Get updates for a specific playlist",
    inputSchema: {
      type: "object",
      properties: {
        playlistId: {
          type: "string",
          description: "The ID of the playlist",
        },
      },
      required: ["playlistId"],
    },
  },
];
