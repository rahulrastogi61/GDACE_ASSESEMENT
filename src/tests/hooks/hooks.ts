import { BeforeAll,AfterAll, Before, After, Status, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright/test";
import { pageFixture } from "./pageFixture";
import { getEnv } from "../../helper/env/env";
import { invokeBrowser } from "../../helper/browsers/browserManager";
import { PlaywrightTestConfig } from "playwright/test";

let page:Page
let browser:Browser
let context:BrowserContext

BeforeAll(async function(){
   getEnv();
   browser = await invokeBrowser();

});

Before(async function(){

    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;


});

AfterStep(async function ({pickle}){

    const img = await pageFixture.page.screenshot(
        { path: `./picture/screenshots/${pickle.name}.png`, type: "png" })

    this.attach(img, "image/png");

})

After(async function({ pickle,result }){

     if(result?.status==Status.FAILED){
        const img =  await pageFixture.page.screenshot(
            { path: `./picture/screenshots/${pickle.name}.png`, type: "png" })
        this.attach(img, "image/png");
     }

    //screnshot
    await pageFixture.page.close();
    await context.close();
})

AfterAll(async function(){

    await browser.close();

});