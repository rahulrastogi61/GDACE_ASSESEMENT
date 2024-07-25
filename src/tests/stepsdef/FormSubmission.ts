import { Given, When, Then } from '@cucumber/cucumber';
import  EligibilityPage  from '../pages/EligibilityPage';
import ContactDetailsPage from '../pages/ContactDetailsPage';
import  ProposalPage  from '../pages/ProposalPage';
import  BusinessImpactPage  from '../pages/BusinessImpactPage';
import  CostPage  from '../pages/CostPage';
import  DeclarationPage from '../pages/DeclarationPage';
import { DataTable } from '@cucumber/cucumber';
import { pageFixture } from "../hooks/pageFixture";
import { ApplicationInformation } from '../../helper/util/ApplicationInformation';

let eligibilityPage : EligibilityPage ;
let contactDetailsPage : ContactDetailsPage ;
let proposalPage : ProposalPage
let businessImpactPage : BusinessImpactPage ;
let costPage : CostPage ;
let declarationPage : DeclarationPage ;

    

Then('User completes and saves all mandatory details on the Eligibility page', async function () {
    eligibilityPage = new EligibilityPage(pageFixture.page);
    contactDetailsPage = new ContactDetailsPage(pageFixture.page);
    proposalPage = new ProposalPage(pageFixture.page);
    businessImpactPage = new BusinessImpactPage(pageFixture.page);
    costPage = new CostPage(pageFixture.page);
    declarationPage = new DeclarationPage(pageFixture.page, 
    new ApplicationInformation);
    await eligibilityPage.clickYesOrNoForAllQuestions('No');

});

Then('User navigates,fills and saves all mandatory details on the Contact Details page', async function () {
    await contactDetailsPage.clickOnContactDetailsMenu();
    await contactDetailsPage.inputMainContactPersonDetails();
    await contactDetailsPage.enterPostalCode('100050');
    await contactDetailsPage.clickSameAsMainContactCheckbox();
    await contactDetailsPage.clickSaveButton();
});

When('The user clicks on the Proposal menu', async function () {
    await proposalPage.clickProposalMenu();
});

Then('User navigates,fills and saves all mandatory details on the Proposal page', async function () {
    await proposalPage.clickProposalMenu();
    await proposalPage.fillProposalDetails();
    await proposalPage.clickSaveButton();
});

Then('User clicks the Save button on Proposal Page', async function () {
    await proposalPage.clickSaveButton();
});

When('The user clicks on the Business Impact menu', async function () {
    await businessImpactPage.clickBusinessImpactMenu();
});

Then('User navigates,fills and saves all mandatory details on the Business Impact page', async function () {
    await businessImpactPage.clickBusinessImpactMenu();
    await businessImpactPage.fillBusinessImpactDetails();
    await businessImpactPage.clickSaveButton();
});

Then('User clicks the Save button on Business Impact page', async function () {
    await businessImpactPage.clickSaveButton();
});

When('The user clicks on the Cost menu', async function () {
    await costPage.clickCostMenu();
});

Then('User navigates,fills and saves all mandatory details on the Cost page', async function () {
    await costPage.clickCostMenu();
    await costPage.fillCostDetails();
    await costPage.clickSaveButton();
});

Then('User click the Save button on Cost page', async function () {
    await costPage.clickSaveButton();
});

When('The user clicks on the declare review menu', async function () {
    await declarationPage.clickDeclareReviewMenu();
});

Then('User answers the declaration questions and accepts the acknowledgement', async function () {
    await declarationPage.clickDeclareReviewMenu();
    await declarationPage.clickYesOrNoForAllQuestions('No')
    await declarationPage.checkAcknowledgement();
});

Then('User checks the acknowledgement', async function () {
    await declarationPage.checkAcknowledgement();
});

Then('User reviews and submits the declaration', async function () {
    await declarationPage.clickSaveButton();
    await declarationPage.clickReviewButton();
});

Then('And User click the Review button on declare review page', async function () {
    await declarationPage.clickReviewButton();
});

Then('User verify the read only Summary page and accepts Consent and Acknowledgement checkbox', async function () {
    await declarationPage.verifyReadOnlySummaryPage();
    await declarationPage.acceptAcknowledgement();
});

Then('Verify the count of actual and expected errors as below', async function (dataTable: DataTable) {
    const errors = dataTable.raw().map(row => row[0]);
    await declarationPage.countErrors(errors);
});

Then('Verify all the Application details matches in the Review Summary page', async function () {
    await declarationPage.verifyReadOnlySummaryPage();
});

Then('User checks Consent and Acknowledgement checkbox is present on Review and Summary page', async function () {
    await declarationPage.verifyConsentAcknowledgementCheckbox();
});

Then('the User checks the Consent and Acknowledgement checkbox', async function () {
    await declarationPage.acceptAcknowledgement();
});

When('User submits the Application and verifies the Success message box is displayed', async function () {
    await declarationPage.submitApplication();
    await declarationPage.verifySuccessMessage();
    await declarationPage.verifyAgencyDetails();
});

Then('User is greeted a Success message box is displayed', async function () {
    await declarationPage.verifySuccessMessage();
});

Then('the Agency details display Enterprise Singapore as the receiving Agency', async function () {
    await declarationPage.verifyAgencyDetails();
});

Then('User navigates to My Application table and verifies the Application is Shown in Processing Tab', async function () {
    await declarationPage.navigateToProcessingTable();
    await declarationPage.verifyApplicationSubmitted();
});

Then('Verify Application Submitted and verify in processing tab', async function () {
    await declarationPage.verifyApplicationSubmitted();
});
