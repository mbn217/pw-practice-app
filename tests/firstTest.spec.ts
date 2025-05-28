import { expect, test } from '@playwright/test';

test.beforeEach(async ({page}) => {
   // This will run before each test in this file
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('Locator syntax', async ({page}) => {
    //find an element by tag name
    await page.locator('input').first().click(); // will click the first input element
    //find an element by id
    page.locator('#inputEmail1')
    //find an element by class name
    page.locator('.input-full-width')
    //find an element by text
    page.locator('form').getByText('Sign in')
    //find an element by attribute
    page.locator('[placeholder="Email"]')
    //find an element by entire class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    //combine locators
    page.locator('input[placeholder="Email"].input-full-width')
    //find an element by xpath (not recommended)
    page.locator('//input[@placeholder="Email"]')
    //By partial text match
    page.locator(':text("Using")')
    //By exact text match
    page.locator(':text-is("Using the Grid")')

   
})

test('User facing locator', async ({page}) => {
    //find an element by text   
    await page.getByRole('textbox', {name: 'Email'}).first().click();
    await page.getByRole('button', {name: 'Sign in'}).first().click();
    //find an element by label
    await page.getByLabel('Email').first().click();
    //find an element by placeholder
    await page.getByPlaceholder('Email').first().click();
    await page.getByText('Sign in').first().click();
    //find an element by title
    await page.getByTitle('Sign in').first().click();
    //find an element by test id    
    await page.getByTestId('sign-in-button').first().click();// This is a custom attribute that you can add to your HTML elements
})

test('Locating child element', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    // This will click the radio button with the text "Option 1" inside the nb-card and nb-radio elements
    //Find sign in button inside a form
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();

})


test('Locating parent element', async ({page}) => {

    await page.locator('nb-card' , {hasText : 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).first().click();
    // This will find the nb-card element that has the text "Using the Grid" and then find the textbox with the name "Email" inside it
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button', {name: 'Sign in'}).first().click();
    // This will find the nb-card element that has the text "Using the Grid" and then find the button with the name "Sign in" inside it
    await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button', {name: 'Sign in'}).first().click();
    // This will find the nb-card element that has the text "Using the Grid" and then find the button with the name "Sign in" inside it
})  



test ('Reusing locators', async ({page}) => {
    const inlineForm = page.locator('nb-card');
    const emailField = inlineForm.getByRole('textbox', {name: 'Email'}).first();

    await emailField.fill('test@mo.com');
    await inlineForm.getByRole('textbox', {name: 'Password'}).first().fill('password123');
    await inlineForm.locator('nb-checkbox').first().click();
    await inlineForm.getByRole('button', {name: 'Submit'}).first().click();

    //assertion
    await expect(emailField).toHaveValue('test@mo.com');
})

test('Extracting values from the page', async ({page}) => {
    //Single text value
    const inlineForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const buttonText = await inlineForm.getByRole('button', {name: 'Submit'}).first().textContent();
    await expect(buttonText).toBe('Submit');

    // all text content
    const allRadioButtons = await page.locator('nb-radio').allTextContents();
    console.log(allRadioButtons); // This will log an array of all the text contents of the radio buttons
    expect(allRadioButtons).toContain("Option 1");

    //input value
    const emailField = inlineForm.getByRole('textbox', {name: 'Email'}).first();
    await emailField.fill('test@mo.com');
    const emailValue = await emailField.inputValue();
    console.log(emailValue); // This will log the value of the email field
    expect(emailValue).toBe('test@mo.com');

    //Get vaue of an attribute
    const emailFieldAttribute = await emailField.getAttribute('placeholder');
    console.log(emailFieldAttribute); // This will log the value of the placeholder attribute of the email field
    expect(emailFieldAttribute).toBe('Email');
    
})




// test('Navigate to Date Picker', async ({page}) => {
//    await page.getByText('Datepicker').click();
// })












// //This is a test suite 
// test.describe('the first test suite', () => {
//   test('the first test in the suite', () => {
//     // This is a test in the first test suite
//   })

//   test('the second test in the suite', () => {
//     // This is another test in the first test suite
//   })
// })