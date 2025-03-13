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

describe('Successful Group Workflow', ()=>{
  test('user goes to groups page', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.getByRole('link', { name: 'Groups' }).click();
    await expect(page).toHaveURL('http://localhost:3000/groups');

  });

  test('user clicks on a group', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.getByRole('link', { name: 'Groups' }).click();
    await expect(page).toHaveURL('http://localhost:3000/groups');

    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');
  });

  test('user creates a group', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.getByRole('link', { name: 'Groups' }).click();
    await expect(page).toHaveURL('http://localhost:3000/groups');

    await page.locator('.groups-add-button').click();
    await expect(page).toHaveURL('http://localhost:3000/groups/new_group');

    await page.locator('#groupname').fill('New Test Group');
    await page.locator('#groupdescription').fill('New test group for testing.');
    await page.locator('#submit').click();


  });
});

describe('Successful User Post Workflow', ()=>{
  test('user goes to their group', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');
  });

  test('user makes a post', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.locator('#\\:r8\\:').fill('New Test Thread');
    await page.locator('#\\:r9\\:').fill('test123');
    await page.locator('.button-post').click();
  });
})

describe('Successful User Thread Workflow', ()=>{
  test('user makes a new thread from groups', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.getByRole('button', { name: 'Create New' }).click();
    await page.locator('#channel_name').fill('Test chjanne;l.');
    await page.locator('form #description').fill('Test Desc');
    await page.getByRole('button', { name: 'Create Channel' }).click();
    await page.reload();
    
  });
  
  // test('user deletes a comment on a thread', async ({page})=>{
  //   await page.goto('http://localhost:3000/login');
  //   await page.locator('input[name="email"]').fill('bob@gmail.com');
  //   await page.locator('input[name="password"]').fill('bob');
  //   await page.locator('.btn.btn-success.w-100').click();
  //   await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
  //   await page.locator('.thread-card').first().click();
  //   await expect(page).toHaveURL(/\/thread\/\d+$/);
  //   await page.locator('.comment-item .del-btn').first().click();
  //   await page.reload();
  // });

  test('user comments on a thread', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.locator('.thread-card').first().click();
    await expect(page).toHaveURL(/\/thread\/\d+$/);

    await page.locator('.reply-button').click();
    await page.locator('#comment-body').fill('Test comment');
    await page.getByRole('button', { name: 'Post Comment' }).click();
    await page.reload();
    await page.locator('.reply-button').click();
    await page.locator('#comment-body').fill('Test comment2');
    await page.getByRole('button', { name: 'Post Comment' }).click();
    await page.locator('.reply-button').click();
    await page.locator('#comment-body').fill('Test comment3');
    await page.getByRole('button', { name: 'Post Comment' }).click();
    await page.locator('.reply-button').click();
    await page.locator('#comment-body').fill('Test comment4');
    await page.getByRole('button', { name: 'Post Comment' }).click();
  });

  test('user deletes a thread', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    await page.locator('.thread-card').first().click();
    await expect(page).toHaveURL(/\/thread\/\d+$/);
    await page.locator('.delete-btn').first().click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
  });
})



//logout
describe('Successful Logout Workflow', ()=>{
  
  test('user logins to writers block', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');

    await page.getByText('Logout').click();


    await expect(page).toHaveURL('http://localhost:3000/login');
  });
});
