// Props API client methods

export class PropsClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  // Props operations
  async getAll(): Promise<any> {
    return this.fetch("/v1/props");
  }

  async get(id: string): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}`);
  }

  async set(id: string, prop: any): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prop),
    });
  }

  async delete(id: string): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }

  async trigger(id: string): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}/trigger`);
  }

  async clear(id: string): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}/clear`);
  }

  async pauseAutoClear(id: string): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}/auto_clear/pause`);
  }

  async resumeAutoClear(id: string): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}/auto_clear/resume`);
  }

  async getThumbnail(id: string): Promise<any> {
    return this.fetch(`/v1/prop/${encodeURIComponent(id)}/thumbnail`);
  }

  // Prop collections operations
  async getCollections(): Promise<any> {
    return this.fetch("/v1/prop_collections");
  }

  async createCollection(collection: { name: string }): Promise<any> {
    return this.fetch("/v1/prop_collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    });
  }

  async getCollection(id: string): Promise<any> {
    return this.fetch(`/v1/prop_collection/${encodeURIComponent(id)}`);
  }

  async setCollection(id: string, collection: any): Promise<any> {
    return this.fetch(`/v1/prop_collection/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    });
  }

  async deleteCollection(id: string): Promise<any> {
    return this.fetch(`/v1/prop_collection/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }
}
