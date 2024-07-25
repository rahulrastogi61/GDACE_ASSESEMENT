import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as path from 'path';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class ProposalPage {
    //private page: Page;
    private base:PlaywrightWrapper;

    private PROPOSAL_MENU: Locator;
    private PROJECT_TITLE: Locator;
    private START_DATE: Locator;
    private END_DATE: Locator;
    private PROJECT_DESCRIPTION: Locator;
    private ACTIVITY_DROPDOWN: Locator;
    private TARGET_MARKET_DROPDOWN: Locator;
    private IS_FIRST_TIME_EXPAND_TRUE_RADIO: Locator;
    private IS_FIRST_TIME_EXPAND_FALSE_RADIO: Locator;
    private REMARKS_DESCRIPTION: Locator;
    private SAVE_BUTTON: Locator;

    constructor(page: Page) {
        //pageFixture.page = page;
        this.base = new PlaywrightWrapper(page)
        this.PROPOSAL_MENU = page.locator("//span[@class='menu-text' and text()='Proposal']");
        this.PROJECT_TITLE = page.locator("//input[@data-testid='text-field' and @id='react-project-title']");
        this.START_DATE = page.locator("//input[@type='text' and @id='react-project-start_date']");
        this.END_DATE = page.locator("//input[@type='text' and @id='react-project-end_date']");
        this.PROJECT_DESCRIPTION = page.locator("//textarea[@id='react-project-description']");
        this.ACTIVITY_DROPDOWN = page.locator("//input[@aria-activedescendant='react-select-project-activity--value']");
        this.TARGET_MARKET_DROPDOWN = page.locator("//input[@aria-activedescendant='react-select-project-primary_market--value']");
        this.IS_FIRST_TIME_EXPAND_TRUE_RADIO = page.locator("#react-project-is_first_time_expand-true");
        this.IS_FIRST_TIME_EXPAND_FALSE_RADIO = page.locator("#react-project-is_first_time_expand-false");
        this.REMARKS_DESCRIPTION = page.locator("//textarea[@id='react-project-remarks']");
        this.SAVE_BUTTON = page.locator("#save-btn");
    }

    async clickProposalMenu() {
        await this.PROPOSAL_MENU.click();
    }

    async fillProposalDetails() {
        await pageFixture.page.waitForSelector("//input[@data-testid='text-field' and @id='react-project-title']");
        if (await this.PROJECT_TITLE.isEnabled()) {
            const dateFormat = new Intl.DateTimeFormat('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
            const currentDate = new Date();
            const startDate = dateFormat.format(currentDate);
            const futureDate = new Date();
            futureDate.setDate(currentDate.getDate() + 30);
            const endDate = dateFormat.format(futureDate);

            const rand = Math.floor(Math.random() * 1000);
            await this.PROJECT_TITLE.fill(`Test Project-${rand}`);
            await this.START_DATE.fill(startDate);
            await this.END_DATE.fill(endDate);
            await this.PROJECT_DESCRIPTION.fill(faker.lorem.paragraph());
            await this.ACTIVITY_DROPDOWN.fill("Identification of Potential Overseas Partners");
            await pageFixture.page.keyboard.press("Enter");
            await this.TARGET_MARKET_DROPDOWN.fill("Singapore");
            await pageFixture.page.keyboard.press("Enter");
            await this.IS_FIRST_TIME_EXPAND_TRUE_RADIO.click();
            await pageFixture.page.setInputFiles("#react-project-attachments-input", path.resolve(__dirname, '../resources/filestoUpload/Upload.jpeg'));
            await this.REMARKS_DESCRIPTION.fill(faker.lorem.paragraph());
            await pageFixture.page.screenshot({ path: path.resolve(__dirname, `../resources/filestoUpload/screenshot_${faker.name.firstName()}.png`) });
            await this.SAVE_BUTTON.click();
        }
    }

    async clickSaveButton() {
        await this.SAVE_BUTTON.click();
    }
}

