import { StageClient } from "../clients/stage.js";

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
