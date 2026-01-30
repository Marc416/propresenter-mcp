// Themes API client methods
// API Group 22: /v1/theme (5 endpoints, includes /v1/themes)

export class ThemesClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/themes");
  }

  async get(id: string): Promise<any> {
    return this.fetch(`/v1/theme/${encodeURIComponent(id)}`);
  }

  async getSlide(id: string, themeSlide: string): Promise<any> {
    return this.fetch(`/v1/theme/${encodeURIComponent(id)}/slides/${encodeURIComponent(themeSlide)}`);
  }

  async setSlide(id: string, themeSlide: string, slideData: any): Promise<any> {
    return this.fetch(`/v1/theme/${encodeURIComponent(id)}/slides/${encodeURIComponent(themeSlide)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slideData),
    });
  }

  async getSlideThumbnail(id: string, themeSlide: string): Promise<any> {
    return this.fetch(`/v1/theme/${encodeURIComponent(id)}/slides/${encodeURIComponent(themeSlide)}/thumbnail`);
  }
}
