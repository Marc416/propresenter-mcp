// Playlists API client methods
// API Group 15: /v1/playlist (30 endpoints, includes /v1/playlists)

export class PlaylistsClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  // List and CRUD operations
  async getAll(): Promise<any> {
    return this.fetch("/v1/playlists");
  }

  async create(playlist: { name: string; type: string }): Promise<any> {
    return this.fetch("/v1/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playlist),
    });
  }

  async get(playlistId: string): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}`);
  }

  async set(playlistId: string, contents: any): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contents),
    });
  }

  async createUnder(playlistId: string, playlist: { name: string; type: string }): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playlist),
    });
  }

  // Active playlists
  async getActive(): Promise<any> {
    return this.fetch("/v1/playlist/active");
  }

  async getActivePresentationThumbnail(index: number, cueIndex: number): Promise<any> {
    return this.fetch(`/v1/playlist/active/presentation/${index}/thumbnail/${cueIndex}`);
  }

  async getActiveAnnouncementThumbnail(index: number, cueIndex: number): Promise<any> {
    return this.fetch(`/v1/playlist/active/announcement/${index}/thumbnail/${cueIndex}`);
  }

  async triggerActivePresentation(): Promise<any> {
    return this.fetch("/v1/playlist/active/presentation/trigger");
  }

  async triggerActiveAnnouncement(): Promise<any> {
    return this.fetch("/v1/playlist/active/announcement/trigger");
  }

  async triggerActivePresentationItem(index: number): Promise<any> {
    return this.fetch(`/v1/playlist/active/presentation/${index}/trigger`);
  }

  async triggerActiveAnnouncementItem(index: number): Promise<any> {
    return this.fetch(`/v1/playlist/active/announcement/${index}/trigger`);
  }

  async focusActivePresentation(): Promise<any> {
    return this.fetch("/v1/playlist/active/presentation/focus");
  }

  async focusActiveAnnouncement(): Promise<any> {
    return this.fetch("/v1/playlist/active/announcement/focus");
  }

  // Focused playlist
  async getFocused(): Promise<any> {
    return this.fetch("/v1/playlist/focused");
  }

  async triggerFocused(): Promise<any> {
    return this.fetch("/v1/playlist/focused/trigger");
  }

  async triggerFocusedItem(index: number): Promise<any> {
    return this.fetch(`/v1/playlist/focused/${index}/trigger`);
  }

  async getFocusedNext(): Promise<any> {
    return this.fetch("/v1/playlist/focused/next");
  }

  async getFocusedPrevious(): Promise<any> {
    return this.fetch("/v1/playlist/focused/previous");
  }

  async triggerFocusedNext(): Promise<any> {
    return this.fetch("/v1/playlist/focused/next/trigger");
  }

  async triggerFocusedPrevious(): Promise<any> {
    return this.fetch("/v1/playlist/focused/previous/trigger");
  }

  async focusNext(): Promise<any> {
    return this.fetch("/v1/playlist/next/focus");
  }

  async focusPrevious(): Promise<any> {
    return this.fetch("/v1/playlist/previous/focus");
  }

  // Specific playlist operations
  async focus(playlistId: string): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}/focus`);
  }

  async trigger(playlistId: string): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}/trigger`);
  }

  async triggerNext(playlistId: string): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}/next/trigger`);
  }

  async triggerPrevious(playlistId: string): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}/previous/trigger`);
  }

  async triggerItem(playlistId: string, index: number): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}/${index}/trigger`);
  }

  async getThumbnail(playlistId: string, index: number, cueIndex: number): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}/${index}/thumbnail/${cueIndex}`);
  }

  async getUpdates(playlistId: string): Promise<any> {
    return this.fetch(`/v1/playlist/${encodeURIComponent(playlistId)}/updates`);
  }
}
