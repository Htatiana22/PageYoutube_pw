import { expect, test } from '@playwright/test';
import { song, } from './data/name.song';
import { searchSong } from './pageObject/youtube.page';

test.describe('page youtube', () => {
  test('search song', async ({ page }) => {
    const SearchSong = new searchSong(page);
    await SearchSong.goto();
    await SearchSong.clickOnSearch();
    await SearchSong.enterData(song.name);
    await SearchSong.searchButton();
    
    await page.waitForSelector('ytd-video-renderer');
    
    const videos = await page.$$('ytd-video-renderer');
    const randomIndex = Math.floor(Math.random() * videos.length);
    const video = videos[randomIndex];

    const videoTitle = await video.$eval('#video-title', el => el.textContent?.trim());

    const getVideoByIndex = `(//a[@class="yt-simple-endpoint style-scope ytd-video-renderer"])[${randomIndex + 1}]`;
    await page.click(getVideoByIndex);
    
    await page.waitForSelector('yt-formatted-string.ytd-watch-metadata');
    const playingVideoTitle = await page.$eval('yt-formatted-string.ytd-watch-metadata', el => el.textContent?.trim());

    await expect(playingVideoTitle).toBe(videoTitle);
  });
});

