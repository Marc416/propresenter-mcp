import { TransportClient } from "../clients/transport.js";

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
