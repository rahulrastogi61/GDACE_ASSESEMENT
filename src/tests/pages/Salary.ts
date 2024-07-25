import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as path from 'path';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class Salary {
    //private page: Page;
    private base:PlaywrightWrapper;
    private ADD_SALARY_ITEM: Locator;
    private EMPLOYEE_NAME: Locator;
    private EMPLOYEE_DESIGNATION: Locator;
    private FIN_NUMBER: Locator;
    private NATIONALITY_TYPE: Locator;
    private ROLE_IN_PROJECT: Locator;
    private PROJECT_INVOLVEMENT: Locator;
    private MONTHLY_SALARY: Locator;
    private SALARY_UPLOAD: Locator;
    private SALARY_REMARKS: Locator;

    constructor(page: Page) {
        //this.page = page;
        this.base = new PlaywrightWrapper(page)
        this.ADD_SALARY_ITEM = pageFixture.page.locator("#react-project_cost-salaries-add-item");
        this.EMPLOYEE_NAME = pageFixture.page.locator("#react-project_cost-salaries-0-name");
        this.EMPLOYEE_DESIGNATION = pageFixture.page.locator("#react-project_cost-salaries-0-designation");
        this.FIN_NUMBER = pageFixture.page.locator("#react-project_cost-salaries-0-nric");
        this.NATIONALITY_TYPE = pageFixture.page.locator("#react-project_cost-salaries-0-nationality");
        this.ROLE_IN_PROJECT = pageFixture.page.locator("//textarea[@id='react-project_cost-salaries-0-project_role']");
        this.PROJECT_INVOLVEMENT = pageFixture.page.locator("#react-project_cost-salaries-0-involvement_months");
        this.MONTHLY_SALARY = pageFixture.page.locator("#react-project_cost-salaries-0-salary_in_billing_currency");
        this.SALARY_UPLOAD = pageFixture.page.locator("#react-project_cost-salaries-0-attachments-input");
        this.SALARY_REMARKS = pageFixture.page.locator("//textarea[@id='react-project_cost-salaries-0-remarks']");
    }

    async fillSalaryDetails() {
        await this.ADD_SALARY_ITEM.click();
        await this.EMPLOYEE_NAME.fill(faker.name.fullName());
        await this.EMPLOYEE_DESIGNATION.fill("Electrical");
        await this.FIN_NUMBER.fill(faker.datatype.uuid());
        await this.NATIONALITY_TYPE.fill("Singaporean");
        await pageFixture.page.keyboard.press("Enter");
        await this.ROLE_IN_PROJECT.fill(faker.lorem.sentence());
        await this.PROJECT_INVOLVEMENT.fill("1");
        await this.MONTHLY_SALARY.fill(faker.finance.amount(100, 1000, 2));
        await this.SALARY_UPLOAD.setInputFiles(path.resolve(__dirname, '../resources/filestoUpload/Vendors.xlsx'));
        await this.SALARY_REMARKS.fill(faker.lorem.sentence());
    }
}

export { Salary };
