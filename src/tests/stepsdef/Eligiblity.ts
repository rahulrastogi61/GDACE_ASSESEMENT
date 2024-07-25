import { Given, When, Then } from '@cucumber/cucumber';
import EligibilityPage  from '../pages/EligibilityPage';
import  LoginPage  from '../pages/LoginPage';
import { pageFixture } from "../hooks/pageFixture";
import { DataTable } from '@cucumber/cucumber';
import { WebActions } from '../../helper/util/WebActions';

let loginPage : LoginPage ;
let eligibilityPage : EligibilityPage ;


//const loginPage = new LoginPage(pageFixture.page);
//const eligibilityPage = new EligibilityPage(pageFixture.page);

Given('User Navigates to My Grants Page', async function () {
    loginPage = new LoginPage(pageFixture.page);
    eligibilityPage = new EligibilityPage(pageFixture.page);
    await loginPage.navigateToUrl(process.env.BASEURL);
    await loginPage.performLogin();
});

Then('User applies for new grant for IT sector and Market Readiness Assistance', async function () {
    await eligibilityPage.applyNewGrant();
});

Then('there should be {int} eligibility questions', async function (noOfQuestions: number) {
    await eligibilityPage.countEligibilityQuestionnaire(noOfQuestions);
});

Then('the five eligibility questions will be as follows', async function (dataTable: DataTable) {
    const questions = dataTable.raw().map(row => row[0]);
    await eligibilityPage.verifyEligibilityQuestions(questions);
});

Given('User fills in all mandatory details on the Eligibility page', async function () {
    // to be implemented
});

Then('User selects sector {string}', async function (sectorType: string) {
    await eligibilityPage.selectSectorType(sectorType);
});

Then('User selects I need this grant to {string}', async function (typeOfGrant: string) {
    await eligibilityPage.selectGrantType(typeOfGrant);
});

Then('User selects assistance {string}', async function (typeOfAssistance: string) {
    await eligibilityPage.selectAssistance(typeOfAssistance);
});

Given('User is on Eligibility section', async function () {
    await eligibilityPage.verifySectionType();
});

Then('User proceeds and Applies for grant', async function () {
    await eligibilityPage.clickProceedButton();
});

Then('User applies for New Grant', async function () {
    await eligibilityPage.applyNewGrant();
});

Then('there should be {int} Yes and {int} No radio buttons', async function (yesRadioBtns: number, noRadioBtns: number) {
    await eligibilityPage.verifyYesAndNoRadioButtonsCount(yesRadioBtns, noRadioBtns);
});

Then('there should be Yes and No radio buttons for the eligibility options:', async function (dataTable: DataTable) {
    const options = dataTable.raw().map(row => row[0]);
    await eligibilityPage.verifyYesAndNoRadioButtons(options);
});

Then('the user should see {int} warning messages {string} for all questions', async function (expectedWarningCount: number, expectedWarningMessage: string) {
    await eligibilityPage.checkWarningMessages(expectedWarningCount, expectedWarningMessage);
});

When('The user sees a warning message', async function () {
    await eligibilityPage.checkWarningMessages(5, "The applicant may not meet the eligibility criteria for this grant. Visit FAQ page for more information on other government grants.");
});

Then('Clicks the link in the warning message', async function () {
    await eligibilityPage.clickTheLinkInWarningMessage();
});

Then('Switch to the new tab and verify URL {string}', async function (expectedURL: string) {
    await eligibilityPage.verifyURLandSwitchToNewTab(expectedURL);
});

Then('User clicks Save button on Eligibility page', async function () {
    await eligibilityPage.clickSaveButton();
});

Then('Refreshing the page should reload the saved values', async function () {
    await eligibilityPage.refreshAndCheckSavedValues();
});

When('the user clicks {string} for all eligibility questions', async function (options: string) {
    await eligibilityPage.clickYesOrNoForAllQuestions(options);
});
