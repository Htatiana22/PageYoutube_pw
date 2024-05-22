import { Page } from '@playwright/test'
import { IsearchSong } from '../interfaces/youtube.ui';

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

}