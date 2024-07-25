import { Page, Locator } from '@playwright/test';
import {PasswordEncrypter}  from '../../helper/util/PasswordEncrypter'
import { pageFixture } from "../hooks/pageFixture";
import PlaywrightWrapper from "../../helper/playwrightWrapper";

export default class LoginPage {
    private base:PlaywrightWrapper;
    private USERNAME_EDITBOX: Locator;
    private PASSWORD_EDITBOX: Locator;
    private SUBMIT_BUTTON: Locator;
    private LOGIN_BUTTON: Locator;
    private ENTITY_ID: Locator;
    private USER_ID: Locator;
    private USER_ROLE: Locator;
    private USER_FULLNAME: Locator;
    private MANUAL_LOGIN_BUTTON: Locator;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.USERNAME_EDITBOX = pageFixture.page.getByRole('textbox', { name: 'Username' });
        this.PASSWORD_EDITBOX = pageFixture.page.getByRole('textbox', { name: 'Password' });
        this.SUBMIT_BUTTON = pageFixture.page.getByRole('button', { name: 'submit' });
        this.LOGIN_BUTTON = pageFixture.page.locator('#login-button');
        this.ENTITY_ID = pageFixture.page.locator('#entityId');
        this.USER_ID = pageFixture.page.locator('#userId');
        this.USER_ROLE = pageFixture.page.locator('#userRole');
        this.USER_FULLNAME = pageFixture.page.locator('#userFullName');
        this.MANUAL_LOGIN_BUTTON = pageFixture.page.getByRole('button', { name: 'Log In' });
    }

    async navigateToUrl(url: string) {
        await pageFixture.page.goto(process.env.BASEURL);
    }

    async performLogin() {
        //await this.USERNAME_EDITBOX.fill(WebActions.getProperty('adminUsername'));
        //await this.PASSWORD_EDITBOX.fill(WebActions.decrypt('adminPassword'));
        await this.USERNAME_EDITBOX.fill("temp-govtech");
        await this.PASSWORD_EDITBOX.fill(PasswordEncrypter.decrypt("YmdQQjNBdzNTb21lR3Z0RkBsayE="));
        await this.SUBMIT_BUTTON.click();
        await this.LOGIN_BUTTON.click();
        //await this.ENTITY_ID.fill(WebActions.getProperty('entityId'));
        //await this.USER_ID.fill(WebActions.getProperty('userId'));()
        //await this.USER_ROLE.fill(WebActions.getProperty('userRole'));
        //await this.USER_FULLNAME.fill(WebActions.getProperty('userFullName'));
        await this.ENTITY_ID.fill("BGPQETECH5");
        await this.USER_ID.fill("S1234567D");
        await this.USER_ROLE.fill("Acceptor");
        await this.USER_FULLNAME.fill("Tan Ah Kow");
        await this.MANUAL_LOGIN_BUTTON.click();
    }
}

