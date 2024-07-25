import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as path from 'path';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class ThirdPartyVendor {
    //private page: Page;
    private base:PlaywrightWrapper;
    private LOCAL_VENDOR: Locator;
    private OVERSEAS_VENDOR: Locator;
    private NAME_OF_VENDOR: Locator;
    private VENDOR_FILE_UPLOAD: Locator;
    private ESTIMATED_COST: Locator;
    private VENDOR_REMARKS: Locator;
    private ADD_VENDOR_BUTTON: Locator;

    constructor(page: Page) {
        //pageFixture.page = page;
        this.base = new PlaywrightWrapper(page)
        this.LOCAL_VENDOR = pageFixture.page.locator("#react-project_cost-vendors-0-local_vendor-true");
        this.OVERSEAS_VENDOR = pageFixture.page.locator("#react-project_cost-vendors-0-local_vendor-false");
        this.NAME_OF_VENDOR = pageFixture.page.locator("#react-project_cost-vendors-0-vendor_name");
        this.VENDOR_FILE_UPLOAD = pageFixture.page.locator("#react-project_cost-vendors-0-attachments-input");
        this.ESTIMATED_COST = pageFixture.page.locator("#react-project_cost-vendors-0-amount_in_billing_currency");
        this.VENDOR_REMARKS = pageFixture.page.locator("//textarea[@id='react-project_cost-vendors-0-remarks']");
        this.ADD_VENDOR_BUTTON = pageFixture.page.locator("#react-project_cost-vendors-add-item");
    }

    async fillVendorDetails() {
        await this.ADD_VENDOR_BUTTON.click();
        await this.LOCAL_VENDOR.click();
        await this.NAME_OF_VENDOR.fill("AUTHENTIC TECH");
        await pageFixture.page.keyboard.press("Enter");
        await pageFixture.page.waitForSelector("//span[@id='vendor-row-sub']");
        await pageFixture.page.locator("//span[@id='vendor-row-sub']").nth(0).click();
        await this.VENDOR_FILE_UPLOAD.setInputFiles(path.resolve(__dirname, '../resources/filestoUpload/vendors.xlsx'));
        await this.ESTIMATED_COST.fill(faker.number.float({ min: 100, max: 1000, precision: 0.01 }).toString());
        await this.VENDOR_REMARKS.fill(faker.lorem.sentence());
    }
}
