import { PresentationClient } from "../clients/presentation.js";

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
