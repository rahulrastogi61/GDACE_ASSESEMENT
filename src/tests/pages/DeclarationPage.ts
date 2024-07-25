import { Page, Locator, expect } from '@playwright/test';
import { ApplicationInformation } from '../../helper/util/ApplicationInformation';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";


export default class DeclarationPage {
    //private page: Page;
    private base:PlaywrightWrapper;
    private DECLARATION_MENU: Locator;
    private ACKNOWLEDGEMENT_CHECKBOX: Locator;
    private SAVE_BUTTON: Locator;
    private REVIEW_BUTTON: Locator;
    private CONSENT_ACKNOWLEDGEMENT_CHECKBOX: Locator;
    private FORM_SUBMIT_BUTTON: Locator;
    private SUBMISSION_STATUS: Locator;
    private AGENCY_DETAILS: Locator;
    private REF_ID: Locator;
    private BACK_TO_GRANT_ACTIONS: Locator;
    private BACK_TO_MY_GRANT: Locator;
    private PROCESSING_TAB: Locator;
    private applicationInformation: ApplicationInformation;

    constructor(page: Page, applicationInformation: ApplicationInformation) {
        //this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.applicationInformation = applicationInformation;
        this.DECLARATION_MENU = pageFixture.page.locator("//span[@class='menu-text' and starts-with(text(), 'Declare')]");
        this.ACKNOWLEDGEMENT_CHECKBOX = pageFixture.page.locator("//input[@id='react-declaration-consent_acknowledgement_check']");
        this.SAVE_BUTTON = pageFixture.page.locator("//button[@id='save-btn']");
        this.REVIEW_BUTTON =pageFixture.page.locator("//button[@id='review-btn']");
        this.CONSENT_ACKNOWLEDGEMENT_CHECKBOX = pageFixture.page.locator("#react-declaration-info_truthfulness_check");
        this.FORM_SUBMIT_BUTTON = pageFixture.page.locator("#submit-btn");
        this.SUBMISSION_STATUS = pageFixture.page.locator("//td[contains(text(),'Status')]/following-sibling::td");
        this.AGENCY_DETAILS = pageFixture.page.locator("//td[contains(text(),'Agency Details:')]/following-sibling::td");
        this.REF_ID = pageFixture.page.locator("//td[contains(text(),'Ref ID:')]/following-sibling::td");
        this.BACK_TO_GRANT_ACTIONS = pageFixture.page.locator("//span[@class='back-text']");
        this.BACK_TO_MY_GRANT = pageFixture.page.locator("//span[@class='back-text']");
        this.PROCESSING_TAB = pageFixture.page.locator("//a[@href='#processing']");
    }

    async clickDeclareReviewMenu() {
        await this.DECLARATION_MENU.click();
    }

    async clickYesOrNoForAllQuestions(options: string) {
        if (options === 'No') {
            await this.clickYesOrNoBasedOnOption(options, 'false');
        } else {
            await this.clickYesOrNoBasedOnOption(options, 'true');
        }
    }

    private async clickYesOrNoBasedOnOption(option: string, value: string) {
        try {
            await pageFixture.page.waitForSelector("//div[@class='subsection-title']");
            const optionCount = await pageFixture.page.locator(`//input[@type='radio' and @value='${value}']`).count();
            console.log("Option count: " + optionCount);
            for (let i = 0; i < optionCount; i++) {
                await pageFixture.page.locator(`//span[@class='bgp-label' and text()='${option}']`).nth(i).click();
            }
        } catch (e) {
            console.error(e);
        }
    }

    async checkAcknowledgement() {
        await this.ACKNOWLEDGEMENT_CHECKBOX.check();
    }

    async clickSaveButton() {
        await this.SAVE_BUTTON.click();
    }

    async clickReviewButton() {
        await this.REVIEW_BUTTON.click();
    }

    async verifyReadOnlySummaryPage() {
        expect(await pageFixture.page.locator("//span[@class='menu-text' and starts-with(text(), 'Company Profile')]").isEnabled()).toBe(true);
    }

    async countErrors(list: string[]) {
        for (let i = 1; i < list.length; i++) {
            expect(await pageFixture.page.locator("//span[@class=\"label label-error\"]").nth(i - 1).innerText()).toBe(list[i]);
        }
    }

    async verifyConsentAcknowledgementCheckbox() {
        await pageFixture.page.waitForSelector("#react-declaration-info_truthfulness_check");
        expect(await this.CONSENT_ACKNOWLEDGEMENT_CHECKBOX.isEnabled()).toBe(true);
        console.log("Consent and Acknowledgement checkbox is present on Review and Summary page");
    }

    async submitApplication() {
        await this.FORM_SUBMIT_BUTTON.click();
    }

    async verifySuccessMessage() {
        await pageFixture.page.waitForSelector("//h3[text()='Your application has been submitted.']");
        expect(await pageFixture.page.locator("//h3[text()='Your application has been submitted.']").isEnabled()).toBe(true);
        expect(await this.SUBMISSION_STATUS.innerText()).toBe("Submitted");
        this.applicationInformation.setAppStatus(await this.SUBMISSION_STATUS.innerText());
    }

    async verifyAgencyDetails() {
        expect(await this.AGENCY_DETAILS.isEnabled()).toBe(true);
        this.applicationInformation.setRefId((await this.REF_ID.innerText()).trim());
        expect((await this.AGENCY_DETAILS.innerText()).trim()).toContain("Enterprise Singapore");
    }

    async acceptAcknowledgement() {
        await this.CONSENT_ACKNOWLEDGEMENT_CHECKBOX.check();
    }

    async navigateToProcessingTable() {
        await this.BACK_TO_GRANT_ACTIONS.click();
        await this.BACK_TO_MY_GRANT.click();
        await this.PROCESSING_TAB.waitFor();
        await this.PROCESSING_TAB.click();
        await pageFixture.page.waitForSelector(`//div[contains(text(), '${this.applicationInformation.getProjectTitle()}')]`);
        await pageFixture.page.locator(`//div[contains(text(), '${this.applicationInformation.getProjectTitle()}')]`).click();
    }

    async verifyApplicationSubmitted() {
        expect((await this.REF_ID.innerText()).trim()).toBe(this.applicationInformation.getRefId());
        expect(await this.SUBMISSION_STATUS.innerText()).toBe(this.applicationInformation.getAppStatus());
    }
}


