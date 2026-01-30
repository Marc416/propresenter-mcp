// Messages API client methods
// API Group 14: /v1/message (7 endpoints, includes /v1/messages)

export class MessagesClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/messages");
  }

  async create(message: any): Promise<any> {
    return this.fetch("/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  }

  async get(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}`);
  }

  async update(messageId: string, message: any): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  }

  async delete(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}`, {
      method: "DELETE",
    });
  }

  async trigger(messageId: string, tokens?: any[]): Promise<any> {
    const options: RequestInit = { method: "POST" };
    if (tokens) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(tokens);
    }
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}/trigger`, options);
  }

  async clear(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}/clear`);
  }
}
