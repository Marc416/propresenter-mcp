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
    messages_show: async (args: { messageId: string }) => {
      await client.show(args.messageId);
      return { content: [{ type: "text" as const, text: `Showed message: ${args.messageId}` }] };
    },
    messages_hide: async () => {
      await client.hide();
      return { content: [{ type: "text" as const, text: "Hid all messages" }] };
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
    presentation_get_focused: async () => {
      const result = await client.getFocused();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    presentation_get_active: async () => {
      const result = await client.getActive();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    presentation_get_slide_index: async () => {
      const result = await client.getSlideIndex();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    },
    presentation_focus_active: async () => {
      await client.focusActive();
      return { content: [{ type: "text" as const, text: "Focused active presentation" }] };
    },
    presentation_trigger_active: async () => {
      await client.triggerActive();
      return { content: [{ type: "text" as const, text: "Triggered active presentation" }] };
    },
    presentation_trigger_next: async () => {
      await client.triggerActiveNext();
      return { content: [{ type: "text" as const, text: "Triggered next presentation cue" }] };
    },
    presentation_trigger_previous: async () => {
      await client.triggerActivePrevious();
      return { content: [{ type: "text" as const, text: "Triggered previous presentation cue" }] };
    },
    presentation_trigger_cue: async (args: { index: number }) => {
      await client.triggerActiveCue(args.index);
      return { content: [{ type: "text" as const, text: `Triggered presentation cue ${args.index}` }] };
    },
    presentation_timeline_operation: async (args: { operation: "play" | "pause" | "rewind" }) => {
      await client.timelineOperation(args.operation);
      return { content: [{ type: "text" as const, text: `Presentation timeline: ${args.operation}` }] };
    },
    presentation_get_timeline_status: async () => {
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
