import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import PlaywrightWrapper from "../../helper/playwrightWrapper";
import { pageFixture } from "../hooks/pageFixture";
import axios from 'axios';
import { WebActions } from '../../helper/util/WebActions';

export default class ContactDetailsPage {
    //private page: Page;
    private base:PlaywrightWrapper;
    private GET_NEW_GRANT: Locator;
    private POSTAL_CODE_INPUT: Locator;
    private UNITLEVEL: Locator;
    private UNITNO: Locator;
    private SAME_AS_REGISTERED_ADDRESS_CHECKBOX: Locator;
    private SAVE_BUTTON: Locator;
    public contactDetailsElements: Map<string, string>;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        //this.page = page;
        console.log("I am here");
        this.GET_NEW_GRANT = pageFixture.page.locator("//span[@class='menu-text' and text()='Contact Details']");
        this.contactDetailsElements = new Map<string, string>([
            ["Name", "#react-contact_info-name"],
            ["Job Title", "#react-contact_info-designation"],
            ["Contact No", "#react-contact_info-phone"],
            ["Email", "#react-contact_info-primary_email"],
            ["Alternate Contact Email", "#react-contact_info-secondary_email"],
            ["Same as registered address checkbox", "#react-contact_info-correspondence_address-copied"],
            ["Mailing Address - Postal Code", "#react-contact_info-correspondence_address-postal"],
            ["Mailing Address - Block No", "#react-contact_info-correspondence_address-block"],
            ["Mailing Address - Street", "#react-contact_info-correspondence_address-street"],
            ["Mailing Address - Level", "#react-contact_info-correspondence_address-level"],
            ["Mailing Address - Unit", "#react-contact_info-correspondence_address-unit"],
            ["Mailing Address - Building", "#react-contact_info-correspondence_address-building_name"]
        ]);
        this.POSTAL_CODE_INPUT = pageFixture.page.locator("#react-contact_info-correspondence_address-postal");
        this.UNITLEVEL = pageFixture.page.locator("#react-contact_info-correspondence_address-level");
        this.UNITNO = pageFixture.page.locator("#react-contact_info-correspondence_address-unit");
        this.SAME_AS_REGISTERED_ADDRESS_CHECKBOX = pageFixture.page.locator("#react-contact_info-correspondence_address-copied");
        this.SAVE_BUTTON = pageFixture.page.locator("//button[@class='bgp-btn bgp-btn-save' and @id='save-btn']");
    }

    async clickOnContactDetailsMenu() {
        await this.GET_NEW_GRANT.click();
    }

    async verifyMainContactPersonFields(list: string[]) {
        await pageFixture.page.waitForSelector(this.contactDetailsElements.get("Name")!);
        for (const field of list) {
            const isElementVisible = await pageFixture.page.locator(this.contactDetailsElements.get(field)!).isVisible();
            //expect(isElementVisible).toBe(true, `${field} field is not displayed.`);
            expect(isElementVisible).toBe(true);
        }
    }

    async enterPostalCode(postalCode: string) {
        await pageFixture.page.waitForSelector("#react-contact_info-correspondence_address-postal");
        await this.POSTAL_CODE_INPUT.fill(postalCode);
        const response = await axios.get(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
        expect(response.status).toBe(200);
        const jsonResponse = response.data;
        expect(jsonResponse).toHaveProperty('found');
        const resultsArray = jsonResponse.results;
        expect(resultsArray.length).toBeGreaterThan(0);
        const addressDetails = resultsArray[0];
        await this.UNITLEVEL.fill("10");
        await this.UNITNO.fill("104");
        await this.verifyPopulatedHouseNumberField(addressDetails.BLK_NO);
        await this.verifyPopulatedStreetField(addressDetails.ROAD_NAME);
    }

    async verifyPopulatedHouseNumberField(houseNumber: string) {
        await pageFixture.page.waitForSelector("#react-contact_info-correspondence_address-block");
        const actualHouseNumber = await pageFixture.page.locator("#react-contact_info-correspondence_address-block").inputValue();
        expect(actualHouseNumber).toBe(houseNumber);
    }

    async verifyPopulatedStreetField(street: string) {
        await pageFixture.page.waitForSelector("#react-contact_info-correspondence_address-street");
        const actualStreet = await pageFixture.page.locator("#react-contact_info-correspondence_address-street").inputValue();
        expect(actualStreet).toBe(street);
    }

    async selectSameAsRegisteredAddressCheckbox() {
        await this.SAME_AS_REGISTERED_ADDRESS_CHECKBOX.click();
    }

    async verifyMailingAddressAutoPopulated(list: string[]) {
        await pageFixture.page.waitForSelector("#react-contact_info-correspondence_address-street");
        const postalCode = await pageFixture.page.locator("#react-contact_info-correspondence_address-postal").inputValue();
        const blockNo = await pageFixture.page.locator("#react-contact_info-correspondence_address-block").inputValue();
        const street = await pageFixture.page.locator("#react-contact_info-correspondence_address-street").inputValue();
        const level = await pageFixture.page.locator("#react-contact_info-correspondence_address-level").inputValue();
        const unit = await pageFixture.page.locator("#react-contact_info-correspondence_address-unit").inputValue();
        expect(postalCode).toBe(list[0]);
        expect(blockNo).toBe(list[1]);
        expect(street).toBe(list[2]);
        expect(level).toBe(list[3]);
        expect(unit).toBe(list[4]);
    }

    async verifyLetterOfOfferAddresseeFieldsEditable() {
        await pageFixture.page.waitForSelector("#react-contact_info-offeree_name");
        expect(await pageFixture.page.locator("#react-contact_info-offeree_name").isEnabled()).toBe(true);
        expect(await pageFixture.page.locator("#react-contact_info-offeree_designation").isEnabled()).toBe(true);
        expect(await pageFixture.page.locator("#react-contact_info-offeree_email").isEnabled()).toBe(true);
    }

    async inputMainContactPersonDetails() {
        await pageFixture.page.locator(this.contactDetailsElements.get("Name")!).fill(faker.name.fullName());
        await pageFixture.page.locator(this.contactDetailsElements.get("Job Title")!).fill("Software Engineer");
        await pageFixture.page.locator(this.contactDetailsElements.get("Contact No")!).fill(faker.phone.number('########'));
        await pageFixture.page.locator(this.contactDetailsElements.get("Email")!).fill(faker.internet.email());
        await pageFixture.page.locator(this.contactDetailsElements.get("Alternate Contact Email")!).fill(faker.internet.email());
    }

    async clickSameAsMainContactCheckbox() {
        await pageFixture.page.locator("#react-contact_info-copied").click();
    }

    async verifyMainContactPersonDetailsPopulated() {
        await pageFixture.page.waitForSelector("#react-contact_info-offeree_name");
        const name = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-offeree_name");
        const jobTitle = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-offeree_designation");
        const email = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-offeree_email");
        expect(name).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-name"));
        expect(jobTitle).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-designation"));
        expect(email).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-primary_email"));
    }

    async clickSaveButton() {
        await this.SAVE_BUTTON.click();
    }

    async refreshPage() {
        await pageFixture.page.reload();
    }

    async verifyReloadedValues() {
        await pageFixture.page.waitForSelector("#react-contact_info-name");
        const name = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-name");
        const jobTitle = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-designation");
        const contactNo = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-phone");
        const email = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-primary_email");
        const alternateEmail = await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-secondary_email");
        expect(name).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-offeree_name"));
        expect(jobTitle).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-offeree_designation"));
        expect(contactNo).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-phone"));
        expect(email).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-primary_email"));
        expect(alternateEmail).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-secondary_email"));
        expect(name).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-name"));
        expect(jobTitle).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-designation"));
        expect(email).toBe(await WebActions.getValueFromDisabledElement(pageFixture.page, "#react-contact_info-primary_email"));
    }

}

