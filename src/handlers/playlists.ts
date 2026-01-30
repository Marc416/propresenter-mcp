import { PlaylistsClient } from "../clients/playlists.js";

export function createPlaylistsHandlers(client: PlaylistsClient) {
  return {
    playlists_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_create: async (args: { name: string; type: string }) => {
      const result = await client.create({ name: args.name, type: args.type });
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_get: async (args: { playlistId: string }) => {
      const result = await client.get(args.playlistId);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_set: async (args: { playlistId: string; contents: any }) => {
      await client.set(args.playlistId, args.contents);
      return { content: [{ type: "text" as const, text: `Updated playlist: ${args.playlistId}` }] };
    },
    playlists_create_under: async (args: { playlistId: string; name: string; type: string }) => {
      const result = await client.createUnder(args.playlistId, { name: args.name, type: args.type });
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_get_active: async () => {
      const result = await client.getActive();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_get_active_presentation_thumbnail: async (args: { index: number; cueIndex: number }) => {
      const result = await client.getActivePresentationThumbnail(args.index, args.cueIndex);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_get_active_announcement_thumbnail: async (args: { index: number; cueIndex: number }) => {
      const result = await client.getActiveAnnouncementThumbnail(args.index, args.cueIndex);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_trigger_active_presentation: async () => {
      await client.triggerActivePresentation();
      return { content: [{ type: "text" as const, text: "Triggered active presentation" }] };
    },
    playlists_trigger_active_announcement: async () => {
      await client.triggerActiveAnnouncement();
      return { content: [{ type: "text" as const, text: "Triggered active announcement" }] };
    },
    playlists_trigger_active_presentation_item: async (args: { index: number }) => {
      await client.triggerActivePresentationItem(args.index);
      return { content: [{ type: "text" as const, text: `Triggered active presentation item ${args.index}` }] };
    },
    playlists_trigger_active_announcement_item: async (args: { index: number }) => {
      await client.triggerActiveAnnouncementItem(args.index);
      return { content: [{ type: "text" as const, text: `Triggered active announcement item ${args.index}` }] };
    },
    playlists_focus_active_presentation: async () => {
      await client.focusActivePresentation();
      return { content: [{ type: "text" as const, text: "Focused active presentation" }] };
    },
    playlists_focus_active_announcement: async () => {
      await client.focusActiveAnnouncement();
      return { content: [{ type: "text" as const, text: "Focused active announcement" }] };
    },
    playlists_get_focused: async () => {
      const result = await client.getFocused();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_trigger_focused: async () => {
      await client.triggerFocused();
      return { content: [{ type: "text" as const, text: "Triggered focused playlist item" }] };
    },
    playlists_trigger_focused_item: async (args: { index: number }) => {
      await client.triggerFocusedItem(args.index);
      return { content: [{ type: "text" as const, text: `Triggered focused playlist item ${args.index}` }] };
    },
    playlists_get_focused_next: async () => {
      const result = await client.getFocusedNext();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_get_focused_previous: async () => {
      const result = await client.getFocusedPrevious();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_trigger_focused_next: async () => {
      await client.triggerFocusedNext();
      return { content: [{ type: "text" as const, text: "Triggered next in focused playlist" }] };
    },
    playlists_trigger_focused_previous: async () => {
      await client.triggerFocusedPrevious();
      return { content: [{ type: "text" as const, text: "Triggered previous in focused playlist" }] };
    },
    playlists_focus_next: async () => {
      await client.focusNext();
      return { content: [{ type: "text" as const, text: "Focused next playlist" }] };
    },
    playlists_focus_previous: async () => {
      await client.focusPrevious();
      return { content: [{ type: "text" as const, text: "Focused previous playlist" }] };
    },
    playlists_focus: async (args: { playlistId: string }) => {
      await client.focus(args.playlistId);
      return { content: [{ type: "text" as const, text: `Focused playlist: ${args.playlistId}` }] };
    },
    playlists_trigger: async (args: { playlistId: string }) => {
      await client.trigger(args.playlistId);
      return { content: [{ type: "text" as const, text: `Triggered playlist: ${args.playlistId}` }] };
    },
    playlists_trigger_next: async (args: { playlistId: string }) => {
      await client.triggerNext(args.playlistId);
      return { content: [{ type: "text" as const, text: `Triggered next in playlist: ${args.playlistId}` }] };
    },
    playlists_trigger_previous: async (args: { playlistId: string }) => {
      await client.triggerPrevious(args.playlistId);
      return { content: [{ type: "text" as const, text: `Triggered previous in playlist: ${args.playlistId}` }] };
    },
    playlists_trigger_item: async (args: { playlistId: string; index: number }) => {
      await client.triggerItem(args.playlistId, args.index);
      return { content: [{ type: "text" as const, text: `Triggered item ${args.index} in playlist: ${args.playlistId}` }] };
    },
    playlists_get_thumbnail: async (args: { playlistId: string; index: number; cueIndex: number }) => {
      const result = await client.getThumbnail(args.playlistId, args.index, args.cueIndex);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    playlists_get_updates: async (args: { playlistId: string }) => {
      const result = await client.getUpdates(args.playlistId);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}
