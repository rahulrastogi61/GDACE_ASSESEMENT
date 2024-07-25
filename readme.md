# Laabhum Automation Framework with Playwright and TypeScript

## Overview

This repository contains the test automation framework for the Laabhum project, implemented using Playwright with TypeScript. The framework is designed to facilitate end-to-end testing and ensure the reliability of the application.

## Prerequisites

Before running the tests, ensure that you have the following installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- npm (Node Package Manager): Comes with Node.js installation

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>

2. navigate to the project directory 

cd GDSACE

3.Install All dependency

npm install

## Configuration

Setting Up Environment Variables

The automation framework requires environment variables for accessing staging and production environments. Please set the following environment variables:

Please setup src/helper/env

# Staging Environment:


 username: Your username for the staging environment.
 password: Your password for the staging environment.

# Production Environment:

username: Your username for the production environment.
pasaword: Your password for the production environment.


To run the test run command "npm run test"

## Report HTML Generate

We can see html report in at test-results/cucumber-report.json  folder after complete run 




