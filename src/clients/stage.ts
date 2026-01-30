// Stage API client methods
// API Group 20: /v1/stage (11 endpoints)

export class StageClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  // Stage message operations
  async getMessage(): Promise<any> {
    return this.fetch("/v1/stage/message");
  }

  async showMessage(message: any): Promise<any> {
    return this.fetch("/v1/stage/message", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  }

  async hideMessage(): Promise<any> {
    return this.fetch("/v1/stage/message", {
      method: "DELETE",
    });
  }

  // Stage layout map operations
  async getLayoutMap(): Promise<any> {
    return this.fetch("/v1/stage/layout_map");
  }

  async setLayoutMap(layoutMap: any): Promise<any> {
    return this.fetch("/v1/stage/layout_map", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(layoutMap),
    });
  }

  // Stage screens operations
  async getScreens(): Promise<any> {
    return this.fetch("/v1/stage/screens");
  }

  async getScreenLayout(id: string): Promise<any> {
    return this.fetch(`/v1/stage/screen/${encodeURIComponent(id)}/layout`);
  }

  async setScreenLayout(id: string, layoutId: string): Promise<any> {
    return this.fetch(`/v1/stage/screen/${encodeURIComponent(id)}/layout/${encodeURIComponent(layoutId)}`);
  }

  // Stage layouts operations
  async getLayouts(): Promise<any> {
    return this.fetch("/v1/stage/layouts");
  }

  async deleteLayout(id: string): Promise<any> {
    return this.fetch(`/v1/stage/layout/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }

  async getLayoutThumbnail(id: string): Promise<any> {
    return this.fetch(`/v1/stage/layout/${encodeURIComponent(id)}/thumbnail`);
  }
}
