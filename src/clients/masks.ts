// Masks API client methods
// API Group 12: /v1/mask (3 endpoints, includes /v1/masks)

export class MasksClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/masks");
  }

  async get(id: string): Promise<any> {
    return this.fetch(`/v1/mask/${encodeURIComponent(id)}`);
  }

  async getThumbnail(id: string): Promise<any> {
    return this.fetch(`/v1/mask/${encodeURIComponent(id)}/thumbnail`);
  }
}
