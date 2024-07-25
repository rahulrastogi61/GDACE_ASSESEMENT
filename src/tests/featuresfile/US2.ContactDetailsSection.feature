@ContactDetails
Feature: Contact Details Section

  Background: : Navigate to Business Grants page
    Given User Navigates to My Grants Page
    Then User applies for New Grant
    Then User selects sector "IT"
    Then User selects I need this grant to "Bring my business overseas or establish a stronger international presence"
    Then User selects assistance "Market Readiness Assistance"
    Then User proceeds and Applies for grant

  @ac1
  Scenario: AC1 Verify fields in the Main Contact Person section
    Given User is on Eligibility section
    When The user clicks on the Contact Details menu
    Then The user should see the fields in the Main Contact Person section
      | Field Name                          |
      | Name                                |
      | Job Title                           |
      | Contact No                          |
      | Email                               |
      | Alternate Contact Email             |
      | Same as registered address checkbox |
      | Mailing Address - Postal Code       |
      | Mailing Address - Block No          |
      | Mailing Address - Street            |
      | Mailing Address - Level             |
      | Mailing Address - Unit              |
      | Mailing Address - Building          |

  @ac2
  Scenario Outline: AC2 Verify autopopulation of Block/House No. and Street using One-map API
    Given User is on Eligibility section
    When The user clicks on the Contact Details menu
    Then The user enters the postal code "<PostalCode>" in the Postal Code field
    Then The House Number field should be auto populated with "<HouseNumber>"
    Then the Street field should be auto populated with "<Street>"
    Examples:
      | PostalCode | HouseNumber | Street              |
      | 100050     | 50          | TELOK BLANGAH DRIVE |


  @ac3
  Scenario Outline: AC3 Auto-populate Mailing Address from Company Profile
    Given User is on Eligibility section
    When The user clicks on the Contact Details menu
    Then The user selects Same as registered address in Company Profile checkbox
    Then The Mailing Address details should be auto-populated from the Applicant’s Company Profile With following "<PostalCode>", "<Block/House No.>", "<Street>", "<Level>", "<Unit>"
    Examples:
      | PostalCode | Block/House No. | Street             | Level | Unit |
      | 117438     | 10              | Pasir Panjang Road | 10    | 01   |

  @ac4
  Scenario: AC4 Check that Letter of Offer Addressee fields are editable
    Given User is on Eligibility section
    When The user clicks on the Contact Details menu
    Then Verify the Letter of Offer Addressee fields are visible and editable

  @ac5
  Scenario: AC5 Check Same as Main Contact Person checkbox functionality
    Given User is on Eligibility section
    When The user clicks on the Contact Details menu
    Then The user inputs main contact person details
    Then The user checks the Same as Main Contact checkbox
    Then The user Verifies the Letter of Offer Addressee fields are populated with details from Main Contact Person

  @ac6
  Scenario: AC6 Save and Reload Applicant's Inputs
    Given User is on Eligibility section
    When The user clicks on the Contact Details menu
    Then The user inputs main contact person details
    Then The user checks the Same as Main Contact checkbox
    Then The user clicks the Save button on Contact Details Page
    Then The user refreshes the page
    Then The user verifies the saved values after reloading the page