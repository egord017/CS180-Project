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
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
  });
});

describe('User makes a post', ()=>{
  test('user goes to their group', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');
  });
})


//logout

