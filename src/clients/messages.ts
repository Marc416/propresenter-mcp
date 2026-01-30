// Messages API client methods

export class MessagesClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/messages");
  }

  async get(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}`);
  }

  async show(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}`);
  }

  async hide(): Promise<any> {
    return this.fetch("/v1/message/hide");
  }

  async trigger(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}/trigger`);
  }

  async clear(messageId: string): Promise<any> {
    return this.fetch(`/v1/message/${encodeURIComponent(messageId)}/clear`);
  }
}
