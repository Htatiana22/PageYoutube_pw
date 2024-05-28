import { Page } from '@playwright/test'
import { IsearchSong } from '../interfaces/youtube.ui';
import { VideoSelector } from '../utils/videoSelector';

export class searchSong implements IsearchSong {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.youtube.com/');
    }

    async clickOnSearch(): Promise<void> {
        await this.page.click('input#search');
    }

    async enterData(name: string): Promise<void> {
        await this.page.fill('input#search', name);
    }

    async searchButton(): Promise<void> {
        await this.page.click('button#search-icon-legacy');
    }

    async selectRandomSong(): Promise<string | undefined> {
        await this.page.waitForSelector("ytd-video-renderer");
    
        const videos = await this.page.$$("ytd-video-renderer");

        const{video, index: randomIndex} = VideoSelector.getRandomVideo(videos);
    
        const videoTitle = await video.$eval("#video-title", (el) =>
          el.textContent?.trim()
        );
    
        const getVideoByIndex = `(//a[@class="yt-simple-endpoint style-scope ytd-video-renderer"])[${
          randomIndex + 1
        }]`;
        await this.page.click(getVideoByIndex);
    
        return videoTitle;
      }
    
      async getSelectedSongTitle(): Promise<string | undefined> {
        await this.page.waitForSelector("yt-formatted-string.ytd-watch-metadata");
        
        const playingVideoTitle = await this.page.$eval(
          "yt-formatted-string.ytd-watch-metadata",
          (el) => el.textContent?.trim()
        );
    
        return playingVideoTitle;
    }
}