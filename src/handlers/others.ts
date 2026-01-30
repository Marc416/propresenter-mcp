// Capture, Clear, Library, Looks, Macros, Messages, Presentation, Status, Timers, Playlists, Props, Stage, Themes, Transport, GlobalGroups, and Masks tool handlers
import { CaptureClient } from "../clients/capture.js";
import { ClearClient } from "../clients/clear.js";
import { LibraryClient } from "../clients/library.js";
import { LooksClient } from "../clients/looks.js";
import { MacrosClient } from "../clients/macros.js";
import { MessagesClient } from "../clients/messages.js";
import { PresentationClient } from "../clients/presentation.js";
import { StatusClient } from "../clients/status.js";
import { TimersClient } from "../clients/timers.js";
import { PlaylistsClient } from "../clients/playlists.js";
import { PropsClient } from "../clients/props.js";
import { StageClient } from "../clients/stage.js";
import { ThemesClient } from "../clients/themes.js";
import { TransportClient } from "../clients/transport.js";
import { GlobalGroupsClient } from "../clients/globalGroups.js";
import { MasksClient } from "../clients/masks.js";

export function createCaptureHandlers(client: CaptureClient) {
  return {
    capture_get_status: async () => {
      const result = await client.getStatus();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    capture_operation: async (args: { operation: "start" | "stop" }) => {
      await client.operation(args.operation);
      return { content: [{ type: "text" as const, text: `Capture ${args.operation}ed` }] };
    },
    capture_get_settings: async () => {
      const result = await client.getSettings();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    capture_get_encodings: async (args: { type: "disk" | "rtmp" | "resi" }) => {
      const result = await client.getEncodings(args.type);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}

export function createClearHandlers(client: ClearClient) {
  return {
    clear_layer: async (args: { layer: string }) => {
      await client.clearLayer(args.layer as any);
      return { content: [{ type: "text" as const, text: `Cleared ${args.layer} layer` }] };
    },
    clear_get_groups: async () => {
      const result = await client.getGroups();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    clear_get_group: async (args: { id: string }) => {
      const result = await client.getGroup(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    clear_trigger_group: async (args: { id: string }) => {
      await client.triggerGroup(args.id);
      return { content: [{ type: "text" as const, text: `Triggered clear group: ${args.id}` }] };
    },
  };
}

export function createLibraryHandlers(client: LibraryClient) {
  return {
    library_get_libraries: async () => {
      const result = await client.getLibraries();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    library_get: async (args: { libraryId: string }) => {
      const result = await client.getLibrary(args.libraryId);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    library_trigger_presentation: async (args: { libraryId: string; presentationId: string }) => {
      await client.triggerPresentation(args.libraryId, args.presentationId);
      return { content: [{ type: "text" as const, text: `Triggered presentation ${args.presentationId} in library ${args.libraryId}` }] };
    },
    library_trigger_presentation_cue: async (args: { libraryId: string; presentationId: string; index: number }) => {
      await client.triggerPresentationCue(args.libraryId, args.presentationId, args.index);
      return { content: [{ type: "text" as const, text: `Triggered cue ${args.index} of presentation ${args.presentationId}` }] };
    },
  };
}

export function createLooksHandlers(client: LooksClient) {
  return {
    looks_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    looks_get_current: async () => {
      const result = await client.getCurrent();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    looks_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    looks_trigger: async (args: { id: string }) => {
      await client.trigger(args.id);
      return { content: [{ type: "text" as const, text: `Triggered look: ${args.id}` }] };
    },
  };
}

export function createMacrosHandlers(client: MacrosClient) {
  return {
    macros_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    macros_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    macros_trigger: async (args: { id: string }) => {
      await client.trigger(args.id);
      return { content: [{ type: "text" as const, text: `Triggered macro: ${args.id}` }] };
    },
  };
}

export function createMessagesHandlers(client: MessagesClient) {
  return {
    messages_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_create: async (args: { message: any }) => {
      const result = await client.create(args.message);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_get: async (args: { messageId: string }) => {
      const result = await client.get(args.messageId);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_update: async (args: { messageId: string; message: any }) => {
      const result = await client.update(args.messageId, args.message);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_delete: async (args: { messageId: string }) => {
      await client.delete(args.messageId);
      return { content: [{ type: "text" as const, text: `Deleted message: ${args.messageId}` }] };
    },
    messages_trigger: async (args: { messageId: string; tokens?: any[] }) => {
      await client.trigger(args.messageId, args.tokens);
      return { content: [{ type: "text" as const, text: `Triggered message: ${args.messageId}` }] };
    },
    messages_clear: async (args: { messageId: string }) => {
      await client.clear(args.messageId);
      return { content: [{ type: "text" as const, text: `Cleared message: ${args.messageId}` }] };
    },
  };
}

export function createPresentationHandlers(client: PresentationClient) {
  return {
    trigger_presentation: async (args: { presentationUuid: string; index?: number }) => {
      if (args.index !== undefined) {
        await client.triggerPresentationCue(args.presentationUuid, args.index);
        return { content: [{ type: "text" as const, text: `Triggered presentation ${args.presentationUuid} at index ${args.index}` }] };
      } else {
        await client.triggerPresentation(args.presentationUuid);
        return { content: [{ type: "text" as const, text: `Triggered presentation ${args.presentationUuid}` }] };
      }
    },
    focus_presentation: async (args: { presentationUuid: string }) => {
      await client.focusPresentation(args.presentationUuid);
      return { content: [{ type: "text" as const, text: `Focused presentation ${args.presentationUuid}` }] };
    },
    get_focused_presentation: async () => {
      const result = await client.getFocused();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    get_active_presentation: async () => {
      const result = await client.getActive();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    get_active_slide_index: async () => {
      const result = await client.getSlideIndex();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    focus_active_presentation: async () => {
      await client.focusActive();
      return { content: [{ type: "text" as const, text: "Focused active presentation" }] };
    },
    trigger_active_presentation: async () => {
      await client.triggerActive();
      return { content: [{ type: "text" as const, text: "Triggered active presentation" }] };
    },
    trigger_focused_presentation: async () => {
      await client.triggerFocused();
      return { content: [{ type: "text" as const, text: "Triggered focused presentation" }] };
    },
    trigger_next_slide: async () => {
      await client.triggerActiveNext();
      return { content: [{ type: "text" as const, text: "Triggered next slide" }] };
    },
    trigger_previous_slide: async () => {
      await client.triggerActivePrevious();
      return { content: [{ type: "text" as const, text: "Triggered previous slide" }] };
    },
    trigger_focused_next: async () => {
      await client.triggerFocusedNext();
      return { content: [{ type: "text" as const, text: "Triggered next in focused presentation" }] };
    },
    trigger_focused_previous: async () => {
      await client.triggerFocusedPrevious();
      return { content: [{ type: "text" as const, text: "Triggered previous in focused presentation" }] };
    },
    trigger_presentation_cue: async (args: { presentationUuid: string; index: number }) => {
      await client.triggerPresentationCue(args.presentationUuid, args.index);
      return { content: [{ type: "text" as const, text: `Triggered cue ${args.index} in presentation ${args.presentationUuid}` }] };
    },
    trigger_focused_cue: async (args: { index: number }) => {
      await client.triggerFocusedCue(args.index);
      return { content: [{ type: "text" as const, text: `Triggered cue ${args.index} in focused presentation` }] };
    },
    timeline_operation: async (args: { operation: "play" | "pause" | "rewind" }) => {
      await client.timelineOperation(args.operation);
      return { content: [{ type: "text" as const, text: `Presentation timeline: ${args.operation}` }] };
    },
    get_timeline_status: async () => {
      const result = await client.getTimelineStatus();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    get_focused_timeline_status: async () => {
      const result = await client.getFocusedTimelineStatus();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    focused_timeline_operation: async (args: { operation: "play" | "pause" | "rewind" }) => {
      await client.focusedTimelineOperation(args.operation);
      return { content: [{ type: "text" as const, text: `Focused presentation timeline: ${args.operation}` }] };
    },
    presentation_timeline_operation: async (args: { presentationUuid: string; operation: "play" | "pause" | "rewind" }) => {
      await client.presentationTimelineOperation(args.presentationUuid, args.operation);
      return { content: [{ type: "text" as const, text: `Presentation ${args.presentationUuid} timeline: ${args.operation}` }] };
    },
    get_presentation: async (args: { presentationUuid: string }) => {
      const result = await client.getPresentation(args.presentationUuid);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    get_presentation_thumbnail: async (args: { presentationUuid: string; index: number; quality?: number }) => {
      const result = await client.getPresentationThumbnail(args.presentationUuid, args.index, args.quality);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    focus_next_presentation: async () => {
      await client.focusNext();
      return { content: [{ type: "text" as const, text: "Focused next presentation" }] };
    },
    focus_previous_presentation: async () => {
      await client.focusPrevious();
      return { content: [{ type: "text" as const, text: "Focused previous presentation" }] };
    },
    trigger_presentation_next: async (args: { presentationUuid: string }) => {
      await client.triggerPresentationNext(args.presentationUuid);
      return { content: [{ type: "text" as const, text: `Triggered next in presentation ${args.presentationUuid}` }] };
    },
    trigger_presentation_previous: async (args: { presentationUuid: string }) => {
      await client.triggerPresentationPrevious(args.presentationUuid);
      return { content: [{ type: "text" as const, text: `Triggered previous in presentation ${args.presentationUuid}` }] };
    },
    trigger_focused_group: async (args: { groupId: string }) => {
      await client.triggerFocusedGroup(args.groupId);
      return { content: [{ type: "text" as const, text: `Triggered group ${args.groupId} in focused presentation` }] };
    },
    trigger_active_group: async (args: { groupId: string }) => {
      await client.triggerActiveGroup(args.groupId);
      return { content: [{ type: "text" as const, text: `Triggered group ${args.groupId} in active presentation` }] };
    },
    trigger_presentation_group: async (args: { presentationUuid: string; groupId: string }) => {
      await client.triggerPresentationGroup(args.presentationUuid, args.groupId);
      return { content: [{ type: "text" as const, text: `Triggered group ${args.groupId} in presentation ${args.presentationUuid}` }] };
    },
    get_chord_chart: async () => {
      const result = await client.getChordChart();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    get_chord_chart_updates: async () => {
      const result = await client.getChordChartUpdates();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}

export function createStatusHandlers(client: StatusClient) {
  return {
    get_propresenter_version: async () => {
      const result = await client.getVersion();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    find_my_mouse: async () => {
      await client.findMyMouse();
      return { content: [{ type: "text" as const, text: "Find my mouse activated" }] };
    },
    status_get_screens: async () => {
      const result = await client.getScreens();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_get_audience: async () => {
      const result = await client.getAudience();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_set_audience: async (args: { screens: any }) => {
      await client.setAudience(args.screens);
      return { content: [{ type: "text" as const, text: "Audience screens configuration updated" }] };
    },
    status_get_stage: async () => {
      const result = await client.getStage();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_set_stage: async (args: { screens: any }) => {
      await client.setStage(args.screens);
      return { content: [{ type: "text" as const, text: "Stage screens configuration updated" }] };
    },
    status_get_layers: async () => {
      const result = await client.getLayers();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_get_slide: async () => {
      const result = await client.getSlide();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_post_updates: async (args: { updates: any }) => {
      const result = await client.postUpdates(args.updates);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}

export function createTimersHandlers(client: TimersClient) {
  return {
    timers_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    timers_get_current: async () => {
      const result = await client.getCurrent();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    timers_get: async (args: { timerId: string }) => {
      const result = await client.get(args.timerId);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    timers_start: async (args: { timerId: string }) => {
      await client.start(args.timerId);
      return { content: [{ type: "text" as const, text: `Started timer: ${args.timerId}` }] };
    },
    timers_stop: async (args: { timerId: string }) => {
      await client.stop(args.timerId);
      return { content: [{ type: "text" as const, text: `Stopped timer: ${args.timerId}` }] };
    },
    timers_reset: async (args: { timerId: string }) => {
      await client.reset(args.timerId);
      return { content: [{ type: "text" as const, text: `Reset timer: ${args.timerId}` }] };
    },
    timers_operation: async (args: { timerId: string; operation: "start" | "stop" | "reset" }) => {
      await client.operation(args.timerId, args.operation);
      return { content: [{ type: "text" as const, text: `Timer ${args.timerId}: ${args.operation}` }] };
    },
    timers_operate_all: async (args: { operation: "start" | "stop" | "reset" }) => {
      await client.operateAll(args.operation);
      return { content: [{ type: "text" as const, text: `All timers: ${args.operation}` }] };
    },
    timers_get_system_time: async () => {
      const result = await client.getSystemTime();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    timers_get_video_countdown: async () => {
      const result = await client.getVideoCountdown();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    timers_increment: async (args: { timerId: string; duration: number }) => {
      await client.increment(args.timerId, args.duration);
      return { content: [{ type: "text" as const, text: `Incremented timer ${args.timerId} by ${args.duration}` }] };
    },
  };
}

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

export function createPropsHandlers(client: PropsClient) {
  return {
    props_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_set: async (args: { id: string; prop: any }) => {
      await client.set(args.id, args.prop);
      return { content: [{ type: "text" as const, text: `Updated prop: ${args.id}` }] };
    },
    props_delete: async (args: { id: string }) => {
      await client.delete(args.id);
      return { content: [{ type: "text" as const, text: `Deleted prop: ${args.id}` }] };
    },
    props_trigger: async (args: { id: string }) => {
      await client.trigger(args.id);
      return { content: [{ type: "text" as const, text: `Triggered prop: ${args.id}` }] };
    },
    props_clear: async (args: { id: string }) => {
      await client.clear(args.id);
      return { content: [{ type: "text" as const, text: `Cleared prop: ${args.id}` }] };
    },
    props_pause_auto_clear: async (args: { id: string }) => {
      await client.pauseAutoClear(args.id);
      return { content: [{ type: "text" as const, text: `Paused auto-clear for prop: ${args.id}` }] };
    },
    props_resume_auto_clear: async (args: { id: string }) => {
      await client.resumeAutoClear(args.id);
      return { content: [{ type: "text" as const, text: `Resumed auto-clear for prop: ${args.id}` }] };
    },
    props_get_thumbnail: async (args: { id: string }) => {
      const result = await client.getThumbnail(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_get_collections: async () => {
      const result = await client.getCollections();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_create_collection: async (args: { name: string }) => {
      const result = await client.createCollection({ name: args.name });
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_get_collection: async (args: { id: string }) => {
      const result = await client.getCollection(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    props_set_collection: async (args: { id: string; collection: any }) => {
      await client.setCollection(args.id, args.collection);
      return { content: [{ type: "text" as const, text: `Updated prop collection: ${args.id}` }] };
    },
    props_delete_collection: async (args: { id: string }) => {
      await client.deleteCollection(args.id);
      return { content: [{ type: "text" as const, text: `Deleted prop collection: ${args.id}` }] };
    },
  };
}

export function createStageHandlers(client: StageClient) {
  return {
    stage_get_message: async () => {
      const result = await client.getMessage();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    stage_show_message: async (args: { message: any }) => {
      await client.showMessage(args.message);
      return { content: [{ type: "text" as const, text: "Stage message shown" }] };
    },
    stage_hide_message: async () => {
      await client.hideMessage();
      return { content: [{ type: "text" as const, text: "Stage message hidden" }] };
    },
    stage_get_layout_map: async () => {
      const result = await client.getLayoutMap();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    stage_set_layout_map: async (args: { layoutMap: any }) => {
      await client.setLayoutMap(args.layoutMap);
      return { content: [{ type: "text" as const, text: "Stage layout map updated" }] };
    },
    stage_get_screens: async () => {
      const result = await client.getScreens();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    stage_get_screen_layout: async (args: { id: string }) => {
      const result = await client.getScreenLayout(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    stage_set_screen_layout: async (args: { id: string; layoutId: string }) => {
      await client.setScreenLayout(args.id, args.layoutId);
      return { content: [{ type: "text" as const, text: `Set layout ${args.layoutId} for screen ${args.id}` }] };
    },
    stage_get_layouts: async () => {
      const result = await client.getLayouts();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    stage_delete_layout: async (args: { id: string }) => {
      await client.deleteLayout(args.id);
      return { content: [{ type: "text" as const, text: `Deleted layout: ${args.id}` }] };
    },
    stage_get_layout_thumbnail: async (args: { id: string }) => {
      const result = await client.getLayoutThumbnail(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}

export function createThemesHandlers(client: ThemesClient) {
  return {
    themes_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    themes_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    themes_get_slide: async (args: { id: string; themeSlide: string }) => {
      const result = await client.getSlide(args.id, args.themeSlide);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    themes_set_slide: async (args: { id: string; themeSlide: string; slideData: any }) => {
      await client.setSlide(args.id, args.themeSlide, args.slideData);
      return { content: [{ type: "text" as const, text: `Updated slide ${args.themeSlide} in theme ${args.id}` }] };
    },
    themes_get_slide_thumbnail: async (args: { id: string; themeSlide: string }) => {
      const result = await client.getSlideThumbnail(args.id, args.themeSlide);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}

export function createTransportHandlers(client: TransportClient) {
  return {
    transport_play: async (args: { layer: "presentation" | "announcement" | "audio" }) => {
      await client.play(args.layer);
      return { content: [{ type: "text" as const, text: `Playing ${args.layer} layer` }] };
    },
    transport_pause: async (args: { layer: "presentation" | "announcement" | "audio" }) => {
      await client.pause(args.layer);
      return { content: [{ type: "text" as const, text: `Paused ${args.layer} layer` }] };
    },
    transport_skip_backward: async (args: { layer: "presentation" | "announcement" | "audio"; time: number }) => {
      await client.skipBackward(args.layer, args.time);
      return { content: [{ type: "text" as const, text: `Skipped backward ${args.time}s in ${args.layer}` }] };
    },
    transport_skip_forward: async (args: { layer: "presentation" | "announcement" | "audio"; time: number }) => {
      await client.skipForward(args.layer, args.time);
      return { content: [{ type: "text" as const, text: `Skipped forward ${args.time}s in ${args.layer}` }] };
    },
    transport_go_to_end: async (args: { layer: "presentation" | "announcement" | "audio"; time?: number }) => {
      await client.goToEnd(args.layer, args.time);
      return { content: [{ type: "text" as const, text: `Went to end of ${args.layer}` }] };
    },
    transport_get_time: async (args: { layer: "presentation" | "announcement" | "audio" }) => {
      const result = await client.getTime(args.layer);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    transport_set_time: async (args: { layer: "presentation" | "announcement" | "audio"; time: number }) => {
      await client.setTime(args.layer, args.time);
      return { content: [{ type: "text" as const, text: `Set ${args.layer} time to ${args.time}s` }] };
    },
    transport_get_auto_advance: async (args: { layer: "presentation" | "announcement" }) => {
      const result = await client.getAutoAdvance(args.layer);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    transport_cancel_auto_advance: async (args: { layer: "presentation" | "announcement" }) => {
      await client.cancelAutoAdvance(args.layer);
      return { content: [{ type: "text" as const, text: `Cancelled auto-advance for ${args.layer}` }] };
    },
    transport_get_current: async (args: { layer: "presentation" | "announcement" | "audio" }) => {
      const result = await client.getCurrent(args.layer);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}

export function createGlobalGroupsHandlers(client: GlobalGroupsClient) {
  return {
    global_groups_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}

export function createMasksHandlers(client: MasksClient) {
  return {
    masks_get_all: async () => {
      const result = await client.getAll();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    masks_get: async (args: { id: string }) => {
      const result = await client.get(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    masks_get_thumbnail: async (args: { id: string }) => {
      const result = await client.getThumbnail(args.id);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
  };
}
