// Clear API client methods

export class ClearClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async clearLayer(layer: "audio" | "props" | "messages" | "announcements" | "slide" | "media" | "video_input"): Promise<any> {
    return this.fetch(`/v1/clear/layer/${layer}`);
  }

  async getGroups(): Promise<any> {
    return this.fetch("/v1/clear/groups");
  }

  async getGroup(id: string): Promise<any> {
    return this.fetch(`/v1/clear/group/${encodeURIComponent(id)}`);
  }

  async createGroup(group: any): Promise<any> {
    return this.fetch("/v1/clear/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group),
    });
  }

  async setGroup(id: string, group: any): Promise<any> {
    return this.fetch(`/v1/clear/group/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(group),
    });
  }

  async deleteGroup(id: string): Promise<any> {
    return this.fetch(`/v1/clear/group/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }

  async getGroupIcon(id: string): Promise<any> {
    return this.fetch(`/v1/clear/group/${encodeURIComponent(id)}/icon`);
  }

  async setGroupIcon(id: string, icon: Blob | Buffer): Promise<any> {
    return this.fetch(`/v1/clear/group/${encodeURIComponent(id)}/icon`, {
      method: "PUT",
      body: icon as BodyInit,
    });
  }

  async triggerGroup(id: string): Promise<any> {
    return this.fetch(`/v1/clear/group/${encodeURIComponent(id)}/trigger`);
  }
}
