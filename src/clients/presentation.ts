// Presentation API client methods

export class PresentationClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async getPresentations(): Promise<any> {
    return this.fetch("/v1/library");
  }

  async triggerPresentation(presentationPath: string, index?: number): Promise<any> {
    const params = index !== undefined ? `?index=${index}` : "";
    return this.fetch(`/v1/presentation/${encodeURIComponent(presentationPath)}/trigger${params}`);
  }

  async focusPresentation(presentationPath: string): Promise<any> {
    return this.fetch(`/v1/presentation/${encodeURIComponent(presentationPath)}/focus`);
  }

  async triggerNext(): Promise<any> {
    return this.fetch("/v1/trigger/next");
  }

  async triggerPrevious(): Promise<any> {
    return this.fetch("/v1/trigger/previous");
  }

  async triggerSlide(index: number): Promise<any> {
    return this.fetch(`/v1/trigger/slide/${index}`);
  }

  async getFocused(): Promise<any> {
    return this.fetch("/v1/presentation/focused");
  }

  async getActive(): Promise<any> {
    return this.fetch("/v1/presentation/active");
  }

  async getSlideIndex(): Promise<any> {
    return this.fetch("/v1/presentation/slide_index");
  }

  async focusActive(): Promise<any> {
    return this.fetch("/v1/presentation/active/focus");
  }

  async triggerActive(): Promise<any> {
    return this.fetch("/v1/presentation/active/trigger");
  }

  async triggerActiveNext(): Promise<any> {
    return this.fetch("/v1/presentation/active/next/trigger");
  }

  async triggerActivePrevious(): Promise<any> {
    return this.fetch("/v1/presentation/active/previous/trigger");
  }

  async triggerActiveCue(index: number): Promise<any> {
    return this.fetch(`/v1/presentation/active/${index}/trigger`);
  }

  async timelineOperation(operation: "play" | "pause" | "rewind"): Promise<any> {
    return this.fetch(`/v1/presentation/active/timeline/${operation}`);
  }

  async getTimelineStatus(): Promise<any> {
    return this.fetch("/v1/presentation/active/timeline");
  }
}
