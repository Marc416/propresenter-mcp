// Looks API client methods

export class LooksClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/looks");
  }

  async getCurrent(): Promise<any> {
    return this.fetch("/v1/look/current");
  }

  async setCurrent(look: any): Promise<any> {
    return this.fetch("/v1/look/current", {
      method: "PUT",
      body: JSON.stringify(look),
    });
  }

  async get(id: string): Promise<any> {
    return this.fetch(`/v1/look/${encodeURIComponent(id)}`);
  }

  async set(id: string, look: any): Promise<any> {
    return this.fetch(`/v1/look/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(look),
    });
  }

  async create(look: any): Promise<any> {
    return this.fetch("/v1/looks", {
      method: "POST",
      body: JSON.stringify(look),
    });
  }

  async delete(id: string): Promise<any> {
    return this.fetch(`/v1/look/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }

  async trigger(id: string): Promise<any> {
    return this.fetch(`/v1/look/${encodeURIComponent(id)}/trigger`);
  }
}
