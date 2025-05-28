import { expect, test } from '@playwright/test';
import { timeout } from 'rxjs-compat/operator/timeout';

test.beforeEach(async ({page}) => {
   // This will run before each test in this file
    await page.goto('http://www.uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    
})

test('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success');
    //await successButton.click();

    //const text = await successButton.textContent();

    await successButton.waitFor({ state: 'attached' });// Wait for the element to be attached to the DOM
    await successButton.waitFor({ state: 'visible' });// Wait for the element to be visible
    const text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');
    expect(successButton).toHaveText('Data loaded with AJAX post request.',{timeout: 25000});// Wait for the element to contain the text  

   
})


test('alternative waiting', async ({page}) => {
    const successButton = page.locator('.bg-success');

    //__ wait for element
    await page.waitForSelector('.bg-success', { state: 'attached' });// Wait for the element to be attached to the DOM

    //__wait for specfic response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')



    const text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');

   
})

//timouts
//Default timeout is 30 seconds, you can change it in the playwright.config.ts file
//You can also set a timeout for a specific test using the timeout option
test('timeouts', async ({page}) => {
    const successButton = page.locator('.bg-success');

    await successButton.click();

})
