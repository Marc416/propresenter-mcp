// Announcement tool handlers
import { AnnouncementClient } from "../clients/announcement.js";

export function createAnnouncementHandlers(client: AnnouncementClient) {
  return {
    announcement_get_active: async () => {
      const result = await client.getActive();
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },

    announcement_get_slide_index: async () => {
      const result = await client.getSlideIndex();
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },

    announcement_focus_active: async () => {
      await client.focusActive();
      return {
        content: [{ type: "text" as const, text: "Focused active announcement" }],
      };
    },

    announcement_trigger_active: async () => {
      await client.triggerActive();
      return {
        content: [{ type: "text" as const, text: "Triggered active announcement" }],
      };
    },

    announcement_trigger_next: async () => {
      await client.triggerNext();
      return {
        content: [{ type: "text" as const, text: "Triggered next announcement cue" }],
      };
    },

    announcement_trigger_previous: async () => {
      await client.triggerPrevious();
      return {
        content: [{ type: "text" as const, text: "Triggered previous announcement cue" }],
      };
    },

    announcement_trigger_cue: async (args: { index: number }) => {
      await client.triggerCue(args.index);
      return {
        content: [{ type: "text" as const, text: `Triggered announcement cue ${args.index}` }],
      };
    },

    announcement_timeline_operation: async (args: { operation: "play" | "pause" | "rewind" }) => {
      await client.timelineOperation(args.operation);
      return {
        content: [{ type: "text" as const, text: `Announcement timeline: ${args.operation}` }],
      };
    },

    announcement_get_timeline_status: async () => {
      const result = await client.getTimelineStatus();
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  };
}
