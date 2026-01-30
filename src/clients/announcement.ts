// Announcement API client methods

export class AnnouncementClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getActive(): Promise<any> {
    return this.fetch("/v1/announcement/active");
  }

  async getSlideIndex(): Promise<any> {
    return this.fetch("/v1/announcement/slide_index");
  }

  async focusActive(): Promise<any> {
    return this.fetch("/v1/announcement/active/focus");
  }

  async triggerActive(): Promise<any> {
    return this.fetch("/v1/announcement/active/trigger");
  }

  async triggerNext(): Promise<any> {
    return this.fetch("/v1/announcement/active/next/trigger");
  }

  async triggerPrevious(): Promise<any> {
    return this.fetch("/v1/announcement/active/previous/trigger");
  }

  async triggerCue(index: number): Promise<any> {
    return this.fetch(`/v1/announcement/active/${index}/trigger`);
  }

  async timelineOperation(operation: "play" | "pause" | "rewind"): Promise<any> {
    return this.fetch(`/v1/announcement/active/timeline/${operation}`);
  }

  async getTimelineStatus(): Promise<any> {
    return this.fetch("/v1/announcement/active/timeline");
  }
}
