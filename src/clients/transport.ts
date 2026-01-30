// Transport API client methods
// API Group 24: /v1/transport (10 endpoints)

export class TransportClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  // Play/Pause operations
  async play(layer: "presentation" | "announcement" | "audio"): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/play`);
  }

  async pause(layer: "presentation" | "announcement" | "audio"): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/pause`);
  }

  // Skip operations
  async skipBackward(layer: "presentation" | "announcement" | "audio", time: number): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/skip_backward/${time}`);
  }

  async skipForward(layer: "presentation" | "announcement" | "audio", time: number): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/skip_forward/${time}`);
  }

  async goToEnd(layer: "presentation" | "announcement" | "audio", time?: number): Promise<any> {
    const query = time !== undefined ? `?time=${time}` : "";
    return this.fetch(`/v1/transport/${layer}/go_to_end${query}`);
  }

  // Time operations
  async getTime(layer: "presentation" | "announcement" | "audio"): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/time`);
  }

  async setTime(layer: "presentation" | "announcement" | "audio", time: number): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/time`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });
  }

  // Auto-advance operations (presentation and announcement only)
  async getAutoAdvance(layer: "presentation" | "announcement"): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/auto_advance`);
  }

  async cancelAutoAdvance(layer: "presentation" | "announcement"): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/auto_advance`, {
      method: "DELETE",
    });
  }

  // Current content
  async getCurrent(layer: "presentation" | "announcement" | "audio"): Promise<any> {
    return this.fetch(`/v1/transport/${layer}/current`);
  }
}
