import { config } from 'dotenv';
import { Page } from '@playwright/test';

// Load environment variables from .env file
config();

class WebActions {
   
    static async getValueFromDisabledElement(page: Page, selector: string): Promise<string> {
        await page.waitForSelector(selector);
        return await page.locator(selector).inputValue();
    }
}

export { WebActions };
