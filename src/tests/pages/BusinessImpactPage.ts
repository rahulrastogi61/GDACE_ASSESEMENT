import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class BusinessImpactPage {
  //private page: Page;
  private base:PlaywrightWrapper;
  private BUSINESS_IMPACT_MENU: Locator;
  private FY_END_DATE: Locator;
  private OVERSEAS_SALES: Locator;
  private OVERSEAS_SALES1: Locator;
  private OVERSEAS_SALES2: Locator;
  private OVERSEAS_SALES3: Locator;
  private OVERSEAS_INVESTMENTS: Locator;
  private OVERSEAS_INVESTMENTS1: Locator;
  private OVERSEAS_INVESTMENTS2: Locator;
  private OVERSEAS_INVESTMENTS3: Locator;
  private RATIONALE_REMARKS: Locator;
  private BENEFITS_REMARKS: Locator;
  private SAVE_BUTTON: Locator;

  constructor(page: Page) {
    //this.page = page;
    this.base = new PlaywrightWrapper(page);
    this.BUSINESS_IMPACT_MENU = pageFixture.page.locator("//span[@class='menu-text' and text()='Business Impact']");
    this.FY_END_DATE = pageFixture.page.locator("//input[@id='react-project_impact-fy_end_date_0']");
    this.OVERSEAS_SALES = pageFixture.page.locator("//input[@id='react-project_impact-overseas_sales_0']");
    this.OVERSEAS_SALES1 = pageFixture.page.locator("//input[@id='react-project_impact-overseas_sales_1']");
    this.OVERSEAS_SALES2 = pageFixture.page.locator("//input[@id='react-project_impact-overseas_sales_2']");
    this.OVERSEAS_SALES3 = pageFixture.page.locator("//input[@id='react-project_impact-overseas_sales_3']");
    this.OVERSEAS_INVESTMENTS = pageFixture.page.locator("//input[@id='react-project_impact-overseas_investments_0']");
    this.OVERSEAS_INVESTMENTS1 = pageFixture.page.locator("//input[@id='react-project_impact-overseas_investments_1']");
    this.OVERSEAS_INVESTMENTS2 = pageFixture.page.locator("//input[@id='react-project_impact-overseas_investments_2']");
    this.OVERSEAS_INVESTMENTS3 = pageFixture.page.locator("//input[@id='react-project_impact-overseas_investments_3']");
    this.RATIONALE_REMARKS = pageFixture.page.locator("//textarea[@id='react-project_impact-rationale_remarks']");
    this.BENEFITS_REMARKS = pageFixture.page.locator("//textarea[@id='react-project_impact-benefits_remarks']");
    this.SAVE_BUTTON = pageFixture.page.locator("//button[@id='save-btn']");
  }

  async clickBusinessImpactMenu() {
    await this.BUSINESS_IMPACT_MENU.click();
  }

  async fillBusinessImpactDetails() {
    await pageFixture.page.waitForSelector("//input[@id='react-project_impact-fy_end_date_0']");
    
    const futureDate = new Date();
    const maxDate = new Date(2023, 11, 31); // Month is 0-indexed in JavaScript

    futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 20));
    if (futureDate > maxDate) {
      futureDate.setTime(maxDate.getTime());
    }

    const fyEndDate = futureDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/ /g, '-');

    await this.FY_END_DATE.fill(fyEndDate);
    await this.OVERSEAS_SALES.fill(faker.datatype.number({ min: 10000, max: 99999 }).toString());
    await this.OVERSEAS_SALES1.fill(faker.datatype.number({ min: 10, max: 99 }).toString());
    await this.OVERSEAS_SALES2.fill(faker.datatype.number({ min: 10, max: 99 }).toString());
    await this.OVERSEAS_SALES3.fill(faker.datatype.number({ min: 10, max: 99 }).toString());
    await this.OVERSEAS_INVESTMENTS.fill(faker.datatype.number({ min: 10000, max: 99999 }).toString());
    await this.OVERSEAS_INVESTMENTS1.fill(faker.datatype.number({ min: 10, max: 99 }).toString());
    await this.OVERSEAS_INVESTMENTS2.fill(faker.datatype.number({ min: 10, max: 99 }).toString());
    await this.OVERSEAS_INVESTMENTS3.fill(faker.datatype.number({ min: 10, max: 99 }).toString());
    await this.RATIONALE_REMARKS.fill(faker.lorem.sentence());
    await this.BENEFITS_REMARKS.fill(faker.lorem.sentence());
  }

  async clickSaveButton() {
    await this.SAVE_BUTTON.click();
  }
}
