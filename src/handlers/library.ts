import { LibraryClient } from "../clients/library.js";

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
