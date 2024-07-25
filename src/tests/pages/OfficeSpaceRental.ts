import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as path from 'path';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class OfficeSpaceRental {
    //private page: Page;
    private base:PlaywrightWrapper;
    
    private ADD_NEW_OFFICE_RENTAL_ITEM: Locator;
    private OFFICE_RENTAL_DESCRIPTION: Locator;
    private OFFICE_RENTAL_DURATION: Locator;
    private OFFICE_MONTHLY_RENTAL_COST: Locator;
    private OFFICE_RENTAL_DOCUMENT_UPLOAD: Locator;
    private OFFICE_RENTAL_REMARKS: Locator;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page)
        this.ADD_NEW_OFFICE_RENTAL_ITEM = page.locator("#react-project_cost-office_rentals-add-item");
        this.OFFICE_RENTAL_DESCRIPTION = page.locator("//textarea[@id='react-project_cost-office_rentals-0-description']");
        this.OFFICE_RENTAL_DURATION = page.locator("#react-project_cost-office_rentals-0-rental_duration");
        this.OFFICE_MONTHLY_RENTAL_COST = page.locator("#react-project_cost-office_rentals-0-amount_in_billing_currency");
        this.OFFICE_RENTAL_DOCUMENT_UPLOAD = page.locator("#react-project_cost-office_rentals-0-attachments-input");
        this.OFFICE_RENTAL_REMARKS = page.locator("//textarea[@id='react-project_cost-office_rentals-0-remarks']");
    }

    async fillOfficeSpaceRentalDetails() {
        await this.ADD_NEW_OFFICE_RENTAL_ITEM.click();
        await this.OFFICE_RENTAL_DESCRIPTION.fill(faker.lorem.sentence());
        await this.OFFICE_RENTAL_DURATION.fill("1");
        await this.OFFICE_MONTHLY_RENTAL_COST.fill(faker.number.float({ min: 100, max: 1000, precision: 0.01 }).toString());
        await this.OFFICE_RENTAL_DOCUMENT_UPLOAD.setInputFiles(path.resolve(__dirname, '../resources/filestoUpload/Vendors.xlsx'));
        await this.OFFICE_RENTAL_REMARKS.fill(faker.lorem.sentence());
    }
}

