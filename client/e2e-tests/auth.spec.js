import { test, expect, describe } from '@playwright/test';


describe('Successful Registration Workflow', ()=>{
  test('user goes to register page', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('.sign-up-btn').click();
    await expect(page).toHaveURL('http://localhost:3000/register');
  });

  test('user submits registration form', async ({page})=>{
    await page.goto('http://localhost:3000/register');
    await page.locator('input[name="username"]').fill(`${Date.now()}`);
    await page.locator('input[name="email"]').fill(`${Date.now()}@gmail.com`);
    await page.locator('input[name="password"]').fill(`${Date.now()}`);
    await page.locator('.btn').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');

  });
});


describe('Successful Login Workflow', ()=>{
  test('user logins to writers block', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('.login-container button').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
  })
    
});
// login
// describe('Authentication', ()=>{
//     test('user logs in', async ({ page }) => {
//         await page.goto('http://localhost:3000/login');
//         await page.fill('input[name="email"]', 'testuser@example.com');
//         await page.fill('input[name="password"]', 'password123');
//         await page.click('button[type="submit"]');
//         await expect(page).toHaveURL('http://localhost:3000/dashboard');
//       });

// });

//logout

