// Capture API client methods

export class CaptureClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getStatus(): Promise<any> {
    return this.fetch("/v1/capture/status");
  }

  async operation(operation: "start" | "stop"): Promise<any> {
    return this.fetch(`/v1/capture/${operation}`);
  }

  async getSettings(): Promise<any> {
    return this.fetch("/v1/capture/settings");
  }

  async getEncodings(type: "disk" | "rtmp" | "resi"): Promise<any> {
    return this.fetch(`/v1/capture/encodings/${type}`);
  }
}
