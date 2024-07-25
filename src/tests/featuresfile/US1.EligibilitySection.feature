@Eligibility
Feature: Eligibility Section

  Background: Navigate to Business Grants page
    Given User Navigates to My Grants Page
    Then User applies for New Grant
    Then User selects sector "IT"
    Then User selects I need this grant to "Bring my business overseas or"
    Then User selects assistance "Market Readiness Assistance"
    Then User proceeds and Applies for grant


  @ac1
  Scenario: AC1 Verify Eligibility Questions
    Given User is on Eligibility section
    Then there should be 5 eligibility questions
    Then the five eligibility questions will be as follows
      | Is the applicant registered in Singapore?*                                                                                                                                                                                                                                                                                                                 |
      | Is the applicant's group sales turnover less than or equal to S$100m or is the applicant's group employment size less than or equal to 200?*                                                                                                                                                                                                               |
      | Does the applicant have at least 30%  local equity?*                                                                                                                                                                                                                                                                                                       |
      | Are the target market(s) that you are applying for a new market? A market is considered new if your company's revenue from there has not exceeded $100,000 in any of the last 3 years.*                                                                                                                                                                    |
      | Are all the following statements true for this project?*The applicant has not started work on this projectThe applicant has not made any payment to any supplier, vendor, or third party prior to applying for this grantThe applicant has not signed any contractual agreement with any supplier, vendor, or third party prior to applying for this grant |

  @ac2
  Scenario: AC2 Yes and No radio button for each eligibility question
    Given User is on Eligibility section
    Then there should be 5 Yes and 5 No radio buttons
    Then there should be Yes and No radio buttons for the eligibility options:
      | react-eligibility-sg_registered_check     |
      | react-eligibility-turnover_check          |
      | react-eligibility-global_hq_check         |
      | react-eligibility-new_target_market_check |
      | react-eligibility-started_project_check   |

  @ac3
  Scenario: AC3 Clicking No on Eligibility question will display a warning message
    Given User is on Eligibility section
    When the user clicks "No" for all eligibility questions
    Then the user should see 5 warning messages "The applicant may not meet the eligibility criteria for this grant. Visit FAQ page for more information on other government grants." for all questions

  @ac4
  Scenario: AC4 Clicking the link in the warning message opens a new tab with the specified URL
    Given User is on Eligibility section
    Given the user clicks "No" for all eligibility questions
    When The user sees a warning message
    Then Clicks the link in the warning message
    Then Switch to the new tab and verify URL 'https://www.gobusiness.gov.sg/business-grants-portal-faq/get-a-grant/'

  @ac5
  Scenario: AC5 Saving Applicant's Inputs
    Given User is on Eligibility section
    When the user clicks "Yes" for all eligibility questions
    Then User clicks Save button on Eligibility page
    Then Refreshing the page should reload the saved values
