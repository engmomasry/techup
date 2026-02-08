const {test , expect} = require('@playwright/test');
const {LoginPage} = require ('../pageobjects/LoginPage');
const { LogoutPage } = require ('../pageobjects/LogoutPage');
const { addEmployee } = require ('../pageobjects/addEmployee');
const { searchEmployee } = require ('../pageobjects/searchEmployee');
const { deleteEmployee } = require ('../pageobjects/deleteEmployee');
const {addVacancy} = require ('../pageobjects/addVacancy');
const {searchVacancy} = require ('../pageobjects/searchVacancy');
const { addLeaveNoBalance } = require ('../pageobjects/addLeaveNoBalance');
const { DashboardPage } = require ('../pageobjects/DashboardPage');


test ('1-OrangeHR varify loginpage elements TC',
    
    //tags for tcs categorization
    {tag :'@smoketc'},
    async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";

    const loginPage = new LoginPage(page);
    await page.pause();
    await loginPage.gotoLoginpage();
    
    
await loginPage.gotoLoginassert();


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR varify loginpage elements TC_${formattedDate}-${formattedTime}.pdf` ,
     displayHeaderFooter:true , printBackground:true})
});



test ('2-OrangeHR valid login TC',
    
    {tag :'@smoketc'},
 async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";

    const loginPage = new LoginPage(page);
    await page.pause();
    await loginPage.gotoLoginpage();
    await loginPage.gotoLoginassert();
    
    await loginPage.validLogin(username,password);

//await page.waitForLoadState("networkidle");

// login assertion - Dashboard page navigation
await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
// Dashboard page assertion
await expect(page.locator('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')).toHaveText('Dashboard');


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR valid login TC_${formattedDate}-${formattedTime}.pdf` ,
    printBackground:true, displayHeaderFooter:true  })

});
test ('3-OrangeHR logout functionality TC',
    {tag : '@smoketc'},
async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";

    const loginPage = new LoginPage(page);
    const logoutPage = new LogoutPage(page);

    await page.pause();
    await loginPage.gotoLoginpage();
    await loginPage.gotoLoginassert();
    
    await loginPage.validLogin(username,password);

// login assertion > Dashboard page navigation
await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');


//logout senario

await logoutPage.validLogout();

//logout asserion > login page is displayed again
await logoutPage.gotoLoginagain();


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR logout functionality TC_${formattedDate}-${formattedTime}.pdf` , 
    displayHeaderFooter:true , printBackground:true})

});

test ('4-OrangeHR add new employee TC & 6-OrangeHR search for emplyee ID TC',
    
     {tag : '@regtc'},
    async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";
     const firstname= "Mostafa";
    const lastname= "Khaled";
    const id= "12345678";

    const loginPage = new LoginPage(page);
   
  const addemployee = new addEmployee(page);
   const searchemployee = new searchEmployee(page);
   
    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);



//add new employee senario
//await page.locator('[class="oxd-main-menu-item active"]').click();
await addemployee.employeenavigation();

await addemployee.employeeAddition(firstname,lastname,id);

//search for emplyee after addition
await searchemployee.employeesearch(id);


//row assertions > the new employee in employee list
await expect(page.getByRole("cell", {name : "12345678"})).toBeVisible();
await expect(page.getByRole("cell", {name : "Mostafa"})).toBeVisible();
await expect(page.getByRole("cell", {name : "khaled"})).toBeVisible();


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR add new employee TC & OrangeHR search for emplyee ID TC_${formattedDate}-${formattedTime}.pdf` ,
     displayHeaderFooter:true, printBackground:true })

});


test ('5-OrangeHR delete employee TC',
    
     {tag : '@regtc'},
    async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";
    const id= "12345678";

    const loginPage = new LoginPage(page);

   const searchemployee = new searchEmployee(page);
    const deleteemployee = new deleteEmployee(page);

  
   
    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);



//add new employee senario
//await page.locator('[class="oxd-main-menu-item active"]').click();
await searchemployee.employeenavigation();

//search for emplyee after addition
await searchemployee.employeesearch(id);


//row assertions > the new employee in employee list
await expect(page.getByRole("cell", {name : "12345678"})).toBeVisible();
await expect(page.getByRole("cell", {name : "Mostafa"})).toBeVisible();
await expect(page.getByRole("cell", {name : "khaled"})).toBeVisible();


//delete employee senario
await deleteemployee.employeedelete(id);


//search for emplyee after deletion
await searchemployee.employeesearch(id);

//deletion assertion
await expect(page.getByRole("cell", {name : "12345678"})).toBeHidden();

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR delete employee TC_${formattedDate}-${formattedTime}.pdf` ,
     displayHeaderFooter:true, printBackground :true })


});

test ('7-OrangeHR job vacancy creation TC',
    
    {tag : '@regtc'},
    async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";
    const jobname= "IT";
    const hiringmanager= "Ranga";
    

    const loginPage = new LoginPage(page);
    const addvacancy = new addVacancy(page);
    const searchvacancy = new searchVacancy(page);


    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);
//add vacancy


await addvacancy.vacancynavigation();

await addvacancy.vacancyAddition(jobname,hiringmanager) ;

//search for the new job vacancy
await searchvacancy.vacancynavigation();
await searchvacancy.vacancysearch();


//row assertions > after job vacancy creation
await expect(page.getByRole("cell", {name : "Software Engineer"}).first()).toBeVisible();



const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`resuts/OrangeHR job vacancy creation TC_${formattedDate}-${formattedTime}.pdf` ,
     displayHeaderFooter:true , printBackground :true})

});

test ('8-OrangeHR add leave request (no balance assertion) TC',
    
    {tag : '@regtc'},
    async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";
    const employeename ="rang";
   const nobalancemessage = 'Balance not sufficient';

    const loginPage = new LoginPage(page);

   const addleave = new addLeaveNoBalance (page);
    

  
   
    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);


//add leave request
await addleave.leavenavigation();


//enter leave details

await addleave.leaveAddition(employeename) ;

await page.pause();

//no balance assertion
await addleave.nobalanceassert(nobalancemessage);


const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR add leave request TC_${formattedDate}-${formattedTime}.pdf` ,
     displayHeaderFooter:true,printBackground:true })


});

test ('9-OrangeHR Dashboard TC',
    
     {tag : '@regtc'},
    async ({page})=> { 

        
    const username= "Admin";
    const password= "admin123";
    const bylocationheader ="Employee Distribution by Location";
   

    const loginPage = new LoginPage(page);

   const dashboardpage = new DashboardPage (page);
    

  
   
    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);

// login assertion - Dashboard page navigation
await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
// Dashboard page assertion
await expect(page.locator('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')).toHaveText('Dashboard');
//await page.pause();

//navigate to dashboard page
await page.locator('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').click();

//piechart assertions
const piechart = page.locator('[class="oxd-pie-chart"]').nth(1).locator('canvas');
await expect(piechart).toBeVisible();

//header assertion

await dashboardpage.dashboardassert(bylocationheader);

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR Dashboard TC_${formattedDate}-${formattedTime}.pdf` , 
    displayHeaderFooter:true, printBackground:true , format: 'A4' });

})