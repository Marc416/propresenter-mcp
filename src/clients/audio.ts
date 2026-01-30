// Audio Playlist API client methods
// API Group 2: /v1/audio (21 endpoints)

export class AudioClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getPlaylists(): Promise<any> {
    return this.fetch("/v1/audio/playlists");
  }

  async getPlaylist(playlistId: string, start?: number): Promise<any> {
    const params = start !== undefined ? `?start=${start}` : "";
    return this.fetch(`/v1/audio/playlist/${encodeURIComponent(playlistId)}${params}`);
  }

  async getPlaylistUpdates(playlistId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/${encodeURIComponent(playlistId)}/updates`);
  }

  async getFocusedPlaylist(): Promise<any> {
    return this.fetch("/v1/audio/playlist/focused");
  }

  async getActivePlaylist(): Promise<any> {
    return this.fetch("/v1/audio/playlist/active");
  }

  async focusNextPlaylist(): Promise<any> {
    return this.fetch("/v1/audio/playlist/next/focus");
  }

  async focusPreviousPlaylist(): Promise<any> {
    return this.fetch("/v1/audio/playlist/previous/focus");
  }

  async focusActivePlaylist(): Promise<any> {
    return this.fetch("/v1/audio/playlist/active/focus");
  }

  async focusPlaylist(playlistId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/${encodeURIComponent(playlistId)}/focus`);
  }

  async triggerFocusedPlaylist(): Promise<any> {
    return this.fetch("/v1/audio/playlist/focused/trigger");
  }

  async triggerActivePlaylist(): Promise<any> {
    return this.fetch("/v1/audio/playlist/active/trigger");
  }

  async triggerPlaylist(playlistId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/${encodeURIComponent(playlistId)}/trigger`);
  }

  async triggerPlaylistItem(playlistId: string, itemId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/${encodeURIComponent(playlistId)}/${encodeURIComponent(itemId)}/trigger`);
  }

  async triggerFocusedNext(): Promise<any> {
    return this.fetch("/v1/audio/playlist/focused/next/trigger");
  }

  async triggerFocusedPrevious(): Promise<any> {
    return this.fetch("/v1/audio/playlist/focused/previous/trigger");
  }

  async triggerFocusedItem(itemId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/focused/${encodeURIComponent(itemId)}/trigger`);
  }

  async triggerActiveNext(): Promise<any> {
    return this.fetch("/v1/audio/playlist/active/next/trigger");
  }

  async triggerActivePrevious(): Promise<any> {
    return this.fetch("/v1/audio/playlist/active/previous/trigger");
  }

  async triggerActiveItem(itemId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/active/${encodeURIComponent(itemId)}/trigger`);
  }

  async triggerPlaylistNext(playlistId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/${encodeURIComponent(playlistId)}/next/trigger`);
  }

  async triggerPlaylistPrevious(playlistId: string): Promise<any> {
    return this.fetch(`/v1/audio/playlist/${encodeURIComponent(playlistId)}/previous/trigger`);
  }
}
