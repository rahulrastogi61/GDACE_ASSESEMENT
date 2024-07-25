import { Given, When, Then } from '@cucumber/cucumber';
import  ContactDetailsPage  from '../pages/ContactDetailsPage';
import { pageFixture } from "../hooks/pageFixture";
import { DataTable } from '@cucumber/cucumber';
import { Page , expect } from '@playwright/test';


let contactDetailsPage : ContactDetailsPage ;
//const contactDetailsPage = new ContactDetailsPage(pageFixture.page);

When('The user clicks on the Contact Details menu', async function () {
    contactDetailsPage = new ContactDetailsPage(pageFixture.page);
    await contactDetailsPage.clickOnContactDetailsMenu();
});

Then('The user should see the fields in the Main Contact Person section', async function (dataTable: DataTable) {
    const fields = dataTable.raw().map(row => row[0]);
    await contactDetailsPage.verifyMainContactPersonFields(fields);
});

When('User fills in all mandatory details on the Contact Details page', async function () {
    // to be implemented
});

Then('The user enters the postal code {string} in the Postal Code field', async function (postalCode: string) {
    await contactDetailsPage.enterPostalCode(postalCode);
});

Then('The House Number field should be auto populated with {string}', async function (houseNumber: string) {
    await contactDetailsPage.verifyPopulatedHouseNumberField(houseNumber);
});

Then('the Street field should be auto populated with {string}', async function (street: string) {
    await contactDetailsPage.verifyPopulatedStreetField(street);
});

Then('The user selects Same as registered address in Company Profile checkbox', async function () {
    await contactDetailsPage.selectSameAsRegisteredAddressCheckbox();
});

Then('The Mailing Address details should be auto-populated from the Applicant’s Company Profile', async function (dataTable: DataTable) {
    const data = dataTable.raw().map(row => row[0]);
    await contactDetailsPage.verifyMailingAddressAutoPopulated(data);
});

Then('The Mailing Address details should be auto-populated from the Applicant’s Company Profile With following {string}, {string}, {string}, {string}, {string}', async function (postalCode: string, houseNo: string, street: string, Level: string, Unit: string) {
    const data = [postalCode, houseNo, street, Level, Unit];
    await contactDetailsPage.verifyMailingAddressAutoPopulated(data);
});

Then('Verify the Letter of Offer Addressee fields are visible and editable', async function () {
    await contactDetailsPage.verifyLetterOfOfferAddresseeFieldsEditable();
});

Then('The user inputs main contact person details', async function () {
    await contactDetailsPage.inputMainContactPersonDetails();
});

Then('The user checks the Same as Main Contact checkbox', async function () {
    await contactDetailsPage.clickSameAsMainContactCheckbox();
});

Then('The user Verifies the Letter of Offer Addressee fields are populated with details from Main Contact Person', async function () {
    await contactDetailsPage.verifyMainContactPersonDetailsPopulated();
});

Then('The user clicks the Save button on Contact Details Page', async function () {
    await contactDetailsPage.clickSaveButton();
});

Then('The user refreshes the page', async function () {
    await contactDetailsPage.refreshPage();
});

Then('The user verifies the saved values after reloading the page', async function () {
    await contactDetailsPage.verifyReloadedValues();
});
