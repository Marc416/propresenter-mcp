// Capture, Clear, Library, Looks, Macros, Messages, Presentation, Status, and Timers tool handlers
import { CaptureClient } from "../clients/capture.js";
import { ClearClient } from "../clients/clear.js";
import { LibraryClient } from "../clients/library.js";
import { LooksClient } from "../clients/looks.js";
import { MacrosClient } from "../clients/macros.js";
import { MessagesClient } from "../clients/messages.js";
import { PresentationClient } from "../clients/presentation.js";
import { StatusClient } from "../clients/status.js";
import { TimersClient } from "../clients/timers.js";

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
    messages_get: async (args: { messageId: string }) => {
      const result = await client.get(args.messageId);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    messages_trigger: async (args: { messageId: string }) => {
      await client.trigger(args.messageId);
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
  };
}

export function createStatusHandlers(client: StatusClient) {
  return {
    status_get_screens: async () => {
      const result = await client.getScreens();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_get_audience: async () => {
      const result = await client.getAudience();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_get_stage: async () => {
      const result = await client.getStage();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    status_get_layers: async () => {
      const result = await client.getLayers();
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
  };
}
