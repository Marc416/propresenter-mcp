import { ThemesClient } from "../clients/themes.js";

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
