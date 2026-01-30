// Global Groups API client methods

export class GlobalGroupsClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/groups");
  }
}
