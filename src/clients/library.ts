// Library API client methods

export class LibraryClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getLibraries(): Promise<any> {
    return this.fetch("/v1/libraries");
  }

  async getLibrary(libraryId: string): Promise<any> {
    return this.fetch(`/v1/library/${encodeURIComponent(libraryId)}`);
  }

  async triggerPresentation(libraryId: string, presentationId: string): Promise<any> {
    return this.fetch(`/v1/library/${encodeURIComponent(libraryId)}/${encodeURIComponent(presentationId)}/trigger`);
  }

  async triggerPresentationCue(libraryId: string, presentationId: string, index: number): Promise<any> {
    return this.fetch(`/v1/library/${encodeURIComponent(libraryId)}/${encodeURIComponent(presentationId)}/${index}/trigger`);
  }
}
