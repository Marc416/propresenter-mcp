// Timers API client methods

export class TimersClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getAll(): Promise<any> {
    return this.fetch("/v1/timers");
  }

  async get(timerId: string): Promise<any> {
    return this.fetch(`/v1/timer/${encodeURIComponent(timerId)}`);
  }

  async start(timerId: string): Promise<any> {
    return this.fetch(`/v1/timer/${encodeURIComponent(timerId)}/start`);
  }

  async stop(timerId: string): Promise<any> {
    return this.fetch(`/v1/timer/${encodeURIComponent(timerId)}/stop`);
  }

  async reset(timerId: string): Promise<any> {
    return this.fetch(`/v1/timer/${encodeURIComponent(timerId)}/reset`);
  }

  async operation(timerId: string, operation: "start" | "stop" | "reset"): Promise<any> {
    return this.fetch(`/v1/timer/${encodeURIComponent(timerId)}/${operation}`);
  }
}
