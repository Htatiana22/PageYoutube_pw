import { ElementHandle } from "@playwright/test";

export namespace VideoSelector {
  export function getRandomVideo(videos: ElementHandle<Element>[]): {
    video: ElementHandle<Element>;
    index: number;
  } {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const video = videos[randomIndex];
    return { video, index: randomIndex };
  }
}