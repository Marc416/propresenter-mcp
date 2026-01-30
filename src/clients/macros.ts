// Macros API client methods

export class MacrosClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/macros");
  }

  async get(id: string): Promise<any> {
    return this.fetch(`/v1/macro/${encodeURIComponent(id)}`);
  }

  async set(id: string, macro: any): Promise<any> {
    return this.fetch(`/v1/macro/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(macro),
    });
  }

  async delete(id: string): Promise<any> {
    return this.fetch(`/v1/macro/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }

  async getIcon(id: string): Promise<any> {
    return this.fetch(`/v1/macro/${encodeURIComponent(id)}/icon`);
  }

  async trigger(id: string): Promise<any> {
    return this.fetch(`/v1/macro/${encodeURIComponent(id)}/trigger`);
  }
}
