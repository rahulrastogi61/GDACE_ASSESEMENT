import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class EligibilityPage {
    //private page: Page;
    private base:PlaywrightWrapper;
    private GET_NEW_GRANT: Locator;
    private ELIGIBILITY_QUESTIONNAIRE: Locator;
    private APPLY_GRANT_BUTTON: Locator;
    private PROCEED_GRANT_BUTTON: Locator;
    private SAVE_BUTTON: Locator;

    constructor(page: Page) {
        //pageFixture.page = page;
        this.base = new PlaywrightWrapper(page);
        this.GET_NEW_GRANT = page.locator("//*[@id='dashboard-menubox-app-apply-grant']/section/div/div[2]/h4");
        this.ELIGIBILITY_QUESTIONNAIRE = page.locator("//div[@data-testid='label']/label");
        this.APPLY_GRANT_BUTTON = page.locator("#go-to-grant");
        this.PROCEED_GRANT_BUTTON = page.locator("#keyPage-form-button");
        this.SAVE_BUTTON = page.locator("//button[@class='bgp-btn bgp-btn-save' and @id='save-btn']");
    }

    async applyNewGrant() {
        await this.GET_NEW_GRANT.click();
    }

    async countEligibilityQuestionnaire(noOfQuestions: number) {
        await pageFixture.page.waitForSelector("//div[@data-testid='label']/label");
        const actualCount = await this.ELIGIBILITY_QUESTIONNAIRE.count();
        expect(actualCount).toBe(noOfQuestions);
    }

    async verifyEligibilityQuestions(list: string[]) {
        const questions = await this.ELIGIBILITY_QUESTIONNAIRE.allInnerTexts();
        for (let i = 0; i < questions.length; i++) {
            const actualQuestion = questions[i].replaceAll("[\\n\\u00A0]", "").trim();
            expect(actualQuestion).toBe(list[i]);
        }
    }

    async selectSectorType(sectorType: string) {
        await pageFixture.page.getByText(sectorType, { exact: true }).click();
    }

    async selectGrantType(typeOfGrant: string) {
        await pageFixture.page.locator("label").filter({ hasText: typeOfGrant }).locator("div").first().click();
    }

    async selectAssistance(typeOfAssistance: string) {
        await pageFixture.page.getByText(typeOfAssistance).click();
    }

    async verifySectionType() {
        // Implement verification if necessary
    }

    async clickProceedButton() {
        await this.APPLY_GRANT_BUTTON.click();
        await this.PROCEED_GRANT_BUTTON.click();
    }

    async verifyYesAndNoRadioButtons(ids: string[]) {
        for (const id of ids) {
            const areButtonsPresent = await this.verifyYesNoRadioButton(id);
            expect(areButtonsPresent).toBe(true);
        }
    }

    private async verifyYesNoRadioButton(id: string): Promise<boolean> {
        const areYesButtonsPresent = await pageFixture.page.locator(`//input[@name='${id}' and @id='${id}-true']`).isVisible();
        const areNoButtonsPresent = await pageFixture.page.locator(`//input[@name='${id}' and @id='${id}-false']`).isVisible();
        return areYesButtonsPresent && areNoButtonsPresent;
    }

    async verifyYesAndNoRadioButtonsCount(expectedYesCount: number, expectedNoCount: number) {
        await pageFixture.page.waitForSelector("//span[@class='bgp-label' and text()='Yes']");
        const actualYesCount = await pageFixture.page.locator("//span[@class='bgp-label' and text()='Yes']").count();
        const actualNoCount = await pageFixture.page.locator("//span[@class='bgp-label' and text()='No']").count();
        expect(actualYesCount).toBe(expectedYesCount);
        expect(actualNoCount).toBe(expectedNoCount);
    }

    async clickYesOrNoForAllQuestions(options: string) {
        if (options === "No") {
            await this.clickYesOrNoBasedOnOption(options, "false");
        } else {
            await this.clickYesOrNoBasedOnOption(options, "true");
        }
    }

    private async clickYesOrNoBasedOnOption(option: string, value: string) {
        await pageFixture.page.waitForSelector(`//input[@type='radio' and @value='${value}']`);
        const optionCount = await pageFixture.page.locator(`//input[@type='radio' and @value='${value}']`).count();
        for (let i = 0; i < optionCount; i++) {
            await pageFixture.page.locator(`//span[@class='bgp-label' and text()='${option}']`).nth(i).click();
        }
    }

    async checkWarningMessages(expectedWarningCount: number, expectedWarningMessage: string) {
        await pageFixture.page.waitForSelector("//div[@class='field-warning-text']");
        const actualWarningCount = await pageFixture.page.locator("//div[@class='field-warning-text']").count();
        expect(actualWarningCount).toBe(expectedWarningCount);
        for (let i = 0; i < actualWarningCount; i++) {
            const actualWarningMessage = await pageFixture.page.locator("//div[@class='field-warning-text']/span").nth(i).innerText();
            expect(actualWarningMessage).toBe(expectedWarningMessage);
        }
    }

    async clickTheLinkInWarningMessage() {
        await pageFixture.page.locator("//div[@class='field-warning-text']//a").nth(1).click();
    }

    async verifyURLandSwitchToNewTab(expectedUrl: string) {
        const [newPage] = await Promise.all([
            pageFixture.page.context().waitForEvent('page'),
            await this.clickTheLinkInWarningMessage()
        ]);
        await newPage.waitForLoadState();
        console.log("newPage: " + newPage.url());
        expect(newPage.url()).toBe(expectedUrl);
    }

    async clickSaveButton() {
        await this.SAVE_BUTTON.click();
    }

    async refreshAndCheckSavedValues() {
        await pageFixture.page.reload();
        await pageFixture.page.waitForSelector("//span[@class='bgp-label' and text()='Yes']");
        const actualYesCount = await pageFixture.page.locator("//span[@class='bgp-label' and text()='Yes']").count();
        for (let i = 0; i < actualYesCount; i++) {
            expect(await pageFixture.page.locator("//span[@class='bgp-label' and text()='Yes']").nth(i).isVisible()).toBe(true);
        }
    }
}

