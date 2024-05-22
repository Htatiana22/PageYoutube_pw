export interface IsearchSong {
    goto(): Promise<void>;
    clickOnSearch(): Promise<void>;
    enterData(name: string): Promise<void>;
    searchButton(): Promise<void>;
    selectRandomSong(): Promise  <String | undefined>;
    getSelectedSongTitle(): Promise  <String | undefined>;
};