import { CaptureClient } from "../clients/capture.js";

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
