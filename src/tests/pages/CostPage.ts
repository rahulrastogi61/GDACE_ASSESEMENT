import { Page, Locator } from '@playwright/test';
import  ThirdPartyVendor  from './ThirdPartyVendor';
import  OfficeSpaceRental  from './OfficeSpaceRental';
import  Salary  from './Salary';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class CostPage {
    //private page: Page;
    private base:PlaywrightWrapper;
    private COST_MENU: Locator;
    private THIRD_PARTY_VENDOR: Locator;
    private OFFICE_SPACE_RENTAL: Locator;
    private SALARY_HEADER: Locator;
    private SAVE_BUTTON: Locator;
    private thirdPartyVendor: ThirdPartyVendor;
    private officeSpaceRental: OfficeSpaceRental;
    private salary: Salary;

    constructor(page: Page) {
        //this.page` = page;
        this.base = new PlaywrightWrapper(page);
        this.COST_MENU = pageFixture.page.locator("//span[@class='menu-text' and text()='Cost']");
        this.THIRD_PARTY_VENDOR = pageFixture.page.locator("#react-project_cost-vendors-accordion-header");
        this.OFFICE_SPACE_RENTAL = pageFixture.page.locator("#react-project_cost-office_rentals-accordion-header");
        this.SALARY_HEADER = pageFixture.page.locator("#react-project_cost-salaries-accordion-header");
        this.SAVE_BUTTON = pageFixture.page.locator("//button[@id='save-btn']");
        this.thirdPartyVendor = new ThirdPartyVendor(page);
        this.officeSpaceRental = new OfficeSpaceRental(page);
        this.salary = new Salary(page);
    }

    async clickCostMenu() {
        await this.COST_MENU.click();
    }

    async fillCostDetails() {
        await this.THIRD_PARTY_VENDOR.click();
        await this.thirdPartyVendor.fillVendorDetails();
        await pageFixture.page.locator("#react-project_cost-vendors-0-title").click();
        await this.OFFICE_SPACE_RENTAL.click();
        await this.officeSpaceRental.fillOfficeSpaceRentalDetails();
        await this.OFFICE_SPACE_RENTAL.click();
        await this.SALARY_HEADER.click();
        await this.salary.fillSalaryDetails();
        await pageFixture.page.locator("#react-project_cost-salaries-0-title").click();
    }

    async clickSaveButton() {
        await this.SAVE_BUTTON.click();
    }
}


