import { StatusClient } from "../clients/status.js";

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
