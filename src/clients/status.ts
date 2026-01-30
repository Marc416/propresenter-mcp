// Status and System API client methods
// API Group 21: /v1/status (8 endpoints) + Group 27: /version (1 endpoint)

export class StatusClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getVersion(): Promise<any> {
    return this.fetch("/version");
  }

  async getScreens(): Promise<any> {
    return this.fetch("/v1/status/screens");
  }

  async getAudience(): Promise<any> {
    return this.fetch("/v1/status/audience_screens");
  }

  async setAudience(screens: any): Promise<any> {
    return this.fetch("/v1/status/audience_screens", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(screens),
    });
  }

  async getStage(): Promise<any> {
    return this.fetch("/v1/status/stage_screens");
  }

  async setStage(screens: any): Promise<any> {
    return this.fetch("/v1/status/stage_screens", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(screens),
    });
  }

  async getLayers(): Promise<any> {
    return this.fetch("/v1/status/layers");
  }
}
