// Macros API client methods
// API Groups 9-11: /v1/macro, /v1/macro_collection, /v1/macros (12 endpoints)

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

  async setIcon(id: string, icon: Blob | Buffer): Promise<any> {
    return this.fetch(`/v1/macro/${encodeURIComponent(id)}/icon`, {
      method: "PUT",
      body: icon as BodyInit,
    });
  }

  async getCollections(): Promise<any> {
    return this.fetch("/v1/macro_collections");
  }

  async getCollection(id: string): Promise<any> {
    return this.fetch(`/v1/macro_collection/${encodeURIComponent(id)}`);
  }

  async createCollection(collection: any): Promise<any> {
    return this.fetch("/v1/macro_collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    });
  }

  async setCollection(id: string, collection: any): Promise<any> {
    return this.fetch(`/v1/macro_collection/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    });
  }

  async deleteCollection(id: string): Promise<any> {
    return this.fetch(`/v1/macro_collection/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }

  async trigger(id: string): Promise<any> {
    return this.fetch(`/v1/macro/${encodeURIComponent(id)}/trigger`);
  }
}
