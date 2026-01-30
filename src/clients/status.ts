// Status and System API client methods

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

  async getStage(): Promise<any> {
    return this.fetch("/v1/status/stage_screens");
  }

  async getLayers(): Promise<any> {
    return this.fetch("/v1/status/layers");
  }
}
