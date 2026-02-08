const {test , expect} = require('@playwright/test');


test ('1-OrangeHR varify loginpage elements TC',
    
    //tags for tcs categorization
    {tag :'@smoketc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
    const page = await context.newPage();//open new tab

    //storing locators
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});
    const forgetpassword= page.locator('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]');
    

await page.goto("https://opensource-demo.orangehrmlive.com/");

//varify login elements
//visability assertions
await expect (username).toBeVisible();
await expect (password).toBeVisible();
await expect (login).toBeVisible();
await expect (forgetpassword).toBeVisible();
//accessibality assertions
await expect (username).toBeEditable();
await expect (password).toBeEditable();
await expect (login).toBeEnabled();
await expect (forgetpassword).toBeEnabled();



const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR varify loginpage elements TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })
});


//playwright special locators //getbyxxx(tagname)
test ('2-OrangeHR valid login TC',
    
    {tag :'@smoketc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
    const page = await context.newPage();
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});

await page.goto("https://opensource-demo.orangehrmlive.com/");

//varify before login
await expect (username).toBeVisible();
await expect (password).toBeVisible();
await expect (login).toBeVisible();


//login with valid credentials
await username.fill("Admin");
await password.fill("admin123");
await page.screenshot({ path: 'screenshot.png' });
await login.click();

//await page.waitForLoadState("networkidle");

// login assertion - Dashboard page navigation
await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
// Dashboard page assertion
await expect(page.locator('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')).toHaveText('Dashboard');

await page.pdf({ path: 'resuts/OrangeHR valid login TC.pdf' , displayHeaderFooter:true })



const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR valid login TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })

});

test ('3-OrangeHR logout functionality TC',
    {tag : '@smoketc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
    const page = await context.newPage();
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});
    const forgetpassword= page.locator('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]');
    

await page.goto("https://opensource-demo.orangehrmlive.com/");

//varify before login
await expect (username).toBeVisible();
await expect (password).toBeVisible();
await expect (login).toBeVisible();


//login with valid credentials
await username.fill("Admin");
await password.fill("admin123");
await login.click();

// login assertion > Dashboard page navigation
await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

//logout senario
await page.locator('[class="oxd-userdropdown-img"]').click();
await page.screenshot({ path: 'screenshot1.png' });
await page.getByRole('menuitem' , {name : "Logout"}).click();

//logout asserion > login page is displayed again
await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR logout functionality TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })

});

test ('4-OrangeHR add new employee TC & 6-OrangeHR search for emplyee ID TC',
    
     {tag : '@regtc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
    const page = await context.newPage();
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});
    
    //page navigation
    await page.goto("https://opensource-demo.orangehrmlive.com/");

//login with valid credentials
await username.fill("Admin");
await password.fill("admin123");
await login.click();


//add new employee senario
await page.locator('[class="oxd-main-menu-item active"]').click();
await page.getByRole("link", {name : "PIM"}).click();

//await page.getByRole("button", {name : " Add "}).click();
//await page.pause();
await page.locator('[class="oxd-button oxd-button--medium oxd-button--secondary"]').click();

//add employee details
await page.getByPlaceholder("First Name").fill("Mostafa");
await page.getByPlaceholder("Last Name").fill("Khaled");
await page.locator('[class="oxd-input oxd-input--active"]').nth(1).fill("1234");

await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
await page.waitForTimeout(2000);
await expect(page.getByRole("button", {name : " Save "})).toHaveText(' Save ');

await page.waitForLoadState("networkidle");

//await page.getByRole("button", {name : " Save "}).click();
await page.locator('[type="submit"]').click();
await page.waitForTimeout(4000);

//search for emplyee after addition
await page.waitForLoadState("networkidle");
await page.getByRole("link", {name : "Employee List"}).dblclick();
await page.locator('[class="oxd-input oxd-input--active"]').nth(1).fill("1234");

await page.getByRole("button", {name : " Search "}).click();

//row assertions > the new employee in employee list
await expect(page.getByRole("cell", {name : "1234"})).toBeVisible();
await expect(page.getByRole("cell", {name : "Mostafa"})).toBeVisible();
await expect(page.getByRole("cell", {name : "khaled"})).toBeVisible();


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR add new employee TC & OrangeHR search for emplyee ID TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })

});

test ('5-OrangeHR delete employee TC',
    
     {tag : '@regtc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
    const page = await context.newPage();
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});
    
    //page navigation
    await page.goto("https://opensource-demo.orangehrmlive.com/");

//login with valid credentials
await username.fill("Admin");
await password.fill("admin123");
await login.click();


//delete employee senario
await page.locator('[class="oxd-main-menu-item active"]').click();
await page.getByRole("link", {name : "PIM"}).click();

//search for emplyee after addition
await page.waitForLoadState("networkidle");
await page.getByRole("link", {name : "Employee List"}).dblclick();
await page.locator('[class="oxd-input oxd-input--active"]').nth(1).fill("051811");

await page.getByRole("button", {name : " Search "}).click();

//row assertions > the employee in employee list
await expect(page.getByRole("cell", {name : "051811"})).toBeVisible();


//row deletion > delete employee
await page.locator('[class="oxd-icon bi-check oxd-checkbox-input-icon"]').nth(1).check();
await page.locator('[class="oxd-icon bi-trash"]').click();

//delete pop-up
page.on('dialog' , dialog => dialog.accept());

//await page.locator('[class="oxd-icon bi-trash"]').click();
await page.getByRole('button' ,{name:" Yes, Delete "}).click();


//search for emplyee after deletion
await page.getByRole("link", {name : "Employee List"}).dblclick();
await page.locator('[class="oxd-input oxd-input--active"]').nth(1).fill("1234");

await page.getByRole("button", {name : " Search "}).click();

//deletion assertion
await expect(page.getByRole("cell", {name : "051811"})).toBeHidden();

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR delete employee TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })


});

test ('7-OrangeHR job vacancy creation TC',
    
    {tag : '@regtc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
const page = await context.newPage();
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});
 
    await page.goto("https://opensource-demo.orangehrmlive.com/");

    //login with valid credentials
await username.fill("Admin");
await password.fill("admin123");
await login.click();

//add job vacancy
await page.getByRole("link", {name : "Recruitment"}).click();
await page.getByRole("link", {name : "Vacancies"}).click();
await page.getByRole("button", {name : " Add "}).click();

//add job details
await page.locator('[class="oxd-input oxd-input--active"]').nth(1).fill("IT");

await page.locator('[class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"]').click();
//await page.pause();
//await page.locator('div[role="listbox"]').click();
await page.waitForTimeout(2000);
await page.getByRole("option", {name : "Software Engineer"}).click();

await page.getByPlaceholder("Type for hints...").pressSequentially("ran");
//await page.waitForTimeout(2000);
await page.waitForSelector('role=option[name="Ranga Akunuri"]', { state: 'visible' });
await page.getByRole('option',{name : "Ranga  Akunuri"}).nth(0).click();
await page.waitForLoadState("networkidle");
await page.getByRole("button", {name : " Save "}).click();
await page.waitForTimeout(2000);

//search for the new job vacancy
await page.getByRole("link", {name : "Vacancies"}).dblclick();

await page.locator('[class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"]').nth(0).click();

await page.waitForSelector('role=option[name="Software Engineer"]', { state: 'visible' });
await page.getByRole("option", {name : "Software Engineer"}).click();
//await page.getByText("Software Engineer").click();
await page.waitForTimeout(2000);
await page.getByRole("button", {name : " Search "}).click();
await page.waitForTimeout(2000);


//row assertions > after job vacancy creation
await expect(page.getByRole("cell", {name : "Software Engineer"}).first()).toBeVisible();
await expect(page.getByRole("cell", {name : "Ranga  Akunuri"}).first()).toBeVisible();
await expect(page.getByRole("cell", {name : "IT"}).first()).toBeVisible();


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR job vacancy creation TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })

});

test ('8-OrangeHR add leave request (no balance assertion) TC',
    
    {tag : '@regtc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
    const page = await context.newPage();
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});
  
    await page.goto("https://opensource-demo.orangehrmlive.com/");

    //login with valid credentials
await username.fill("Admin");
await password.fill("admin123");
await login.click();

//add leave request
await page.getByRole("link", {name : "Leave"}).click();
await page.getByRole("link", {name : "Assign Leave"}).click();
await page.waitForLoadState("networkidle");

//enter leave details
await page.getByPlaceholder("Type for hints...").pressSequentially("rang");
//await page.waitForTimeout(2000);
await page.waitForSelector('role=option[name="Ranga Akunuri"]', { state: 'visible' });
await page.getByRole('option',{name : "Ranga  Akunuri"}).nth(0).click();
await page.waitForLoadState("networkidle");



await page.locator('[class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"]').click();

await page.waitForSelector('role=option[name="CAN - Personal"]', { state: 'visible' });
await page.getByRole("option", {name : "CAN - Personal"}).click();


//await page.pause();
await page.locator('[class="oxd-icon bi-calendar oxd-date-input-icon"]').nth(0).click();
await page.getByText("January").click();
await page.getByText("30").click()

//no balance assertion
await expect(page.locator('[class="oxd-text oxd-text--p orangehrm-leave-balance-text --error"]')).toHaveText('Balance not sufficient');


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR add leave request TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })


});

test ('9-OrangeHR Dashboard TC',
    
     {tag : '@regtc'},
    async ({browser})=> { 


    const context = await browser.newContext({ slowMo: 500 });
    const page = await context.newPage();
    const username= page.getByPlaceholder("Username");
    const password= page.getByPlaceholder("Password");
    const login = page.getByRole("button", {name : " Login "});

await page.goto("https://opensource-demo.orangehrmlive.com/");

//login with valid credentials
await username.fill("Admin");
await password.fill("admin123");
await login.click();

// login assertion - Dashboard page navigation
await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
// Dashboard page assertion
await expect(page.locator('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')).toHaveText('Dashboard');
//await page.pause();

//navigate to dashboard page
await page.locator('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').click();

//piechart assertions
const piechart = page.locator('[class="oxd-pie-chart"]').nth(1).locator('canvas')
await expect(piechart).toBeVisible();

const piechartlocation = page.locator('[class="orangehrm-dashboard-widget-header"]').last()
await expect(piechartlocation).toHaveText("Employee Distribution by Location");

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR Dashboard TC_${formattedDate}-${formattedTime}.pdf` , displayHeaderFooter:true })

});