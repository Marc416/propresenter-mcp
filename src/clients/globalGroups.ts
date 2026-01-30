// Global Groups API client methods
// API Group 6: /v1/group (1 endpoint)

export class GlobalGroupsClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/groups");
  }
}
