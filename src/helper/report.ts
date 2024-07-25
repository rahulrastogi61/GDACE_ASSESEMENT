const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "./htmlReport",
  reportName:"GDSACE Playwright Report",
  metadata: {
    browser: {
      name: "chrome",
      version: "123",
    },
    device: "Local test machine",
    platform: {
      name: "window",
      version: "10.04",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "GDSACE Project" },
      { label: "Release", value: "" },
      { label: "Cycle", value: "" },
      { label: "Execution Start Time", value: "Jul 29th 2024, 02:56 PM EST" },
      { label: "Execution End Time", value: "Jul 29th 2024, 02:56 PM EST" },
    ],
  },
});