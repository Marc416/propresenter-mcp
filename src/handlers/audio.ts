// Audio tool handlers
import { AudioClient } from "../clients/audio.js";

export function createAudioHandlers(client: AudioClient) {
  return {
    audio_get_playlists: async () => {
      const result = await client.getPlaylists();
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },

    audio_get_playlist: async (args: { playlistId: string; start?: number }) => {
      const result = await client.getPlaylist(args.playlistId, args.start);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },

    audio_get_focused_playlist: async () => {
      const result = await client.getFocusedPlaylist();
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },

    audio_get_active_playlist: async () => {
      const result = await client.getActivePlaylist();
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },

    audio_focus_next_playlist: async () => {
      await client.focusNextPlaylist();
      return {
        content: [{ type: "text" as const, text: "Focused next audio playlist" }],
      };
    },

    audio_focus_previous_playlist: async () => {
      await client.focusPreviousPlaylist();
      return {
        content: [{ type: "text" as const, text: "Focused previous audio playlist" }],
      };
    },

    audio_focus_active_playlist: async () => {
      await client.focusActivePlaylist();
      return {
        content: [{ type: "text" as const, text: "Focused active audio playlist" }],
      };
    },

    audio_focus_playlist: async (args: { playlistId: string }) => {
      await client.focusPlaylist(args.playlistId);
      return {
        content: [{ type: "text" as const, text: `Focused playlist: ${args.playlistId}` }],
      };
    },

    audio_trigger_focused_playlist: async () => {
      await client.triggerFocusedPlaylist();
      return {
        content: [{ type: "text" as const, text: "Triggered focused playlist" }],
      };
    },

    audio_trigger_active_playlist: async () => {
      await client.triggerActivePlaylist();
      return {
        content: [{ type: "text" as const, text: "Triggered active playlist" }],
      };
    },

    audio_trigger_playlist: async (args: { playlistId: string }) => {
      await client.triggerPlaylist(args.playlistId);
      return {
        content: [{ type: "text" as const, text: `Triggered playlist: ${args.playlistId}` }],
      };
    },

    audio_trigger_playlist_item: async (args: { playlistId: string; itemId: string }) => {
      await client.triggerPlaylistItem(args.playlistId, args.itemId);
      return {
        content: [{ type: "text" as const, text: `Triggered item ${args.itemId} in playlist ${args.playlistId}` }],
      };
    },

    audio_trigger_focused_next: async () => {
      await client.triggerFocusedNext();
      return {
        content: [{ type: "text" as const, text: "Triggered next item in focused playlist" }],
      };
    },

    audio_trigger_focused_previous: async () => {
      await client.triggerFocusedPrevious();
      return {
        content: [{ type: "text" as const, text: "Triggered previous item in focused playlist" }],
      };
    },

    audio_trigger_active_next: async () => {
      await client.triggerActiveNext();
      return {
        content: [{ type: "text" as const, text: "Triggered next item in active playlist" }],
      };
    },

    audio_trigger_active_previous: async () => {
      await client.triggerActivePrevious();
      return {
        content: [{ type: "text" as const, text: "Triggered previous item in active playlist" }],
      };
    },
  };
}
