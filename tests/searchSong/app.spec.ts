import { expect, test } from '@playwright/test';
import { searchSong } from './pageObject/youtube.page';
import { song } from './data/dataNameSong';


test.describe('Search for song on youtube page', () => {
  test('Select a random song and compare the song name', async ({ page }) => {
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
