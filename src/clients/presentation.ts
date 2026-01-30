// Presentation API client methods

export class PresentationClient {
  constructor(private fetch: (path: string, options?: RequestInit) => Promise<any>) {}

  async triggerPresentation(uuid: string): Promise<any> {
    return this.fetch(`/v1/presentation/${encodeURIComponent(uuid)}/trigger`);
  }

  async triggerPresentationCue(uuid: string, index: number): Promise<any> {
    return this.fetch(`/v1/presentation/${encodeURIComponent(uuid)}/${index}/trigger`);
  }

  async focusPresentation(uuid: string): Promise<any> {
    return this.fetch(`/v1/presentation/${encodeURIComponent(uuid)}/focus`);
  }

  async triggerNext(): Promise<any> {
    return this.fetch("/v1/trigger/next");
  }

  async triggerPrevious(): Promise<any> {
    return this.fetch("/v1/trigger/previous");
  }

  async triggerFocused(): Promise<any> {
    return this.fetch("/v1/presentation/focused/trigger");
  }

  async triggerFocusedNext(): Promise<any> {
    return this.fetch("/v1/presentation/focused/next/trigger");
  }

  async triggerFocusedPrevious(): Promise<any> {
    return this.fetch("/v1/presentation/focused/previous/trigger");
  }

  async triggerFocusedCue(index: number): Promise<any> {
    return this.fetch(`/v1/presentation/focused/${index}/trigger`);
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
