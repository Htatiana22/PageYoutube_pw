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

    const selectedSongTitle = await SearchSong.selectRandomSong();
    const playingSongTitle = await SearchSong.getSelectedSongTitle();

    await expect(playingSongTitle).toBe(selectedSongTitle);
  });
});
