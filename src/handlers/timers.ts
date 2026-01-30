import { TimersClient } from "../clients/timers.js";

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
