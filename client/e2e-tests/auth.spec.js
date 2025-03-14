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
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
  });


  test('user goes to groups page', async ({page})=>{
    await page.getByRole('link', { name: 'Groups' }).click();
    await expect(page).toHaveURL('http://localhost:3000/groups');

  });

  test('user clicks on a group', async ({page})=>{
    await page.getByRole('link', { name: 'Groups' }).click();
    await expect(page).toHaveURL('http://localhost:3000/groups');

    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');
  });

  test('user creates a group', async ({page})=>{
    await page.getByRole('link', { name: 'Groups' }).click();
    await expect(page).toHaveURL('http://localhost:3000/groups');

    await page.locator('.groups-add-button').click();
    await expect(page).toHaveURL('http://localhost:3000/groups/new_group');

    await page.locator('#groupname').fill('New Test Group');
    await page.locator('#groupdescription').fill('New test group for testing.');
    await page.locator('#submit-group').click();
  });

});

describe('Successful User Thread Workflow', ()=>{
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
  });

  test('user navigates to a thread', async ({page})=>{
    await page.locator('.thread-card').first().click();
    await expect(page).toHaveURL(/\/thread\/\d+$/);
  });

  test('user makes a a new thread', async ({page})=>{
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.locator('#\\:r8\\:').fill('New Test Thread');
    await page.locator('#\\:r9\\:').fill('test123');
    await page.locator('.button-post').click();
  });

  test('user comments on a thread', async ({page})=>{
    await page.locator('.thread-card').first().click();
    await expect(page).toHaveURL(/\/thread\/\d+$/);

    await page.locator('.reply-button').click();
    await page.locator('#comment-body').fill('Test comment');
    await page.getByRole('button', { name: 'Post Comment' }).click();

  });
})

describe('Successful User Profile Workflow', ()=>{
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        await page.locator('input[name="email"]').fill('bob@gmail.com');
        await page.locator('input[name="password"]').fill('bob');
        await page.locator('.btn.btn-success.w-100').click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard');
    });

    test('user goes to their profile', async ({page})=>{
      await page.getByText('Profile').click();
      await expect(page).toHaveURL('http://localhost:3000/profile/bob');
    });

    test('user clicks on a group they joined from their profile', async ({page})=>{
      await page.getByText('Profile').click();
      await expect(page).toHaveURL('http://localhost:3000/profile/bob');

      await page.getByText("Poet's Society").click();
      await expect(page).toHaveURL('http://localhost:3000/group/1');
    });

  test("user goes to a group members' profile", async ({page})=>{
    await page.getByRole('link', { name: 'Groups' }).click();
    await expect(page).toHaveURL('http://localhost:3000/groups');

    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.getByRole('tab', { name: 'Group Members' }).click();
    await page.locator('ul li a[href^="/profile/"]').first().click();
    await expect(page).toHaveURL(/\/profile\/\w+$/);
  });
});

describe('Successful User Workshop Workflow', ()=>{
  test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      await page.locator('input[name="email"]').fill('bob@gmail.com');
      await page.locator('input[name="password"]').fill('bob');
      await page.locator('.btn.btn-success.w-100').click();
      await expect(page).toHaveURL('http://localhost:3000/dashboard');
  });

  test('user goes to the workshop tab', async ({page})=>{
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.getByRole('tab', { name: 'Workshops' }).click();
    await page.locator('.workshop-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/workshop/1');

  });

  test('user clicks on a short story', async ({page})=>{
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.getByRole('tab', { name: 'Workshops' }).click();
    await page.locator('.workshop-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/workshop/1');

    await page.locator('.threads-container').first().click();
  });

  test('user clicks on a short story and makes a critique', async ({page})=>{
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.getByRole('tab', { name: 'Workshops' }).click();
    await page.locator('.workshop-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/workshop/1');

    await page.getByText('Notes From The Ground CH2').click();
    await expect(page).toHaveURL(/\/workshop-thread\/\d+$/);
    await page.reload();

    await page.getByRole('button', { name: 'Critique' }).first().click();
    await expect(page).toHaveURL(/\/workshop-thread\/\d+\/submit$/);

    await page.locator('#opening').fill('This is my test critique.');
    await page.locator('#body').fill('test body critique.');
    await page.locator('#closing').fill('closing test critique.');
    await page.getByRole('button', { name: 'Post Thread' }).click();
    await page.reload();
 });
 
 


  test('user edits the text for a critque', async ({page})=>{
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.getByRole('tab', { name: 'Workshops' }).click();
    await page.locator('.workshop-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/workshop/1');

    await page.getByText('Notes From The Ground CH2').click();
    await expect(page).toHaveURL(/\/workshop-thread\/\d+$/);
    await page.reload();

    await page.waitForSelector('button:has-text("Critique")', { state: 'visible', timeout: 5000 });
    await page.getByRole('button', { name: 'Critique' }).first().click();
    await expect(page).toHaveURL(/\/workshop-thread\/\d+\/submit$/);

    await page.evaluate(() => {
      const editable = document.querySelector('.passage-body ins[contenteditable="true"]');
      if (editable) editable.innerText = 'TEST EDIT';
    });

    await page.locator('.passage-body').click();
  
    await page.locator('.passage-body ins[contenteditable="true"]').click();
    await page.keyboard.type('This is my new test edit.');
    
    await page.locator('#opening').fill('Edit test critique.');
    await page.locator('#body').fill('Edit body critique.');
    await page.locator('#closing').fill('Edit closing critique.');
    await page.getByRole('button', { name: 'Post Thread' }).click();
    await expect(page).toHaveURL(/\/critique\/\d+$/);
  });



  test('user makes a new post for critique', async ({page})=>{
    await page.locator('.group-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/group/1');

    await page.getByRole('tab', { name: 'Workshops' }).click();
    await page.locator('.workshop-card').first().click();
    await expect(page).toHaveURL('http://localhost:3000/workshop/1');

    await page.getByRole('button', { name: 'Post'}).click();
    await expect(page).toHaveURL('http://localhost:3000/workshop/1/submit');
    await page.reload();

    await page.locator('#title').fill('test title.');
    await page.locator('#context').fill('test context.');
    await page.locator('#preference').fill('test critque guidance');
    await page.locator('#post_body').fill('test post bodye');
    await page.locator('#passage_body').fill('test passage body');

    await page.getByRole('button', { name: 'Post Thread' }).click();
    await expect(page).toHaveURL(/\/workshop-thread\/\d+$/);
  });

});

describe('Successful Logout Workflow', ()=>{
  
  test('user logouts from writers block', async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.locator('input[name="email"]').fill('bob@gmail.com');
    await page.locator('input[name="password"]').fill('bob');
    await page.locator('.btn.btn-success.w-100').click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');

    await page.getByText('Logout').click();


    await expect(page).toHaveURL('http://localhost:3000/login');
  });
});
