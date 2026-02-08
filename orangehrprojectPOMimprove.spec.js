const {test , expect} = require('@playwright/test');

//import the POmanager
const {POMmanger} = require ('../pageobjects/POMmanger');



test ('1-OrangeHR varify loginpage elements TC',
    
    //tags for tcs categorization
    {tag :'@smoketc'},
    async ({page})=> { 


        //create one object only that holds all the pages' objects
        const pOMmanger = new POMmanger(page);
        
    const username= "Admin";
    const password= "admin123";

    const loginPage =pOMmanger.gotoLoginpage();
    //await page.pause();
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

        const pOMmanger = new POMmanger(page);
    const username= "Admin";
    const password= "admin123";

    const loginPage =pOMmanger.gotoLoginpage();
    //await page.pause();
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

        const pOMmanger = new POMmanger(page);
    const username= "Admin";
    const password= "admin123";

    const loginPage =pOMmanger.gotoLoginpage();
    const logoutPage =pOMmanger.gotoLogoutPage();

    //await page.pause();
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
const pOMmanger = new POMmanger(page);
        
    const username= "Admin";
    const password= "admin123";
     const firstname= "Mostafa";
    const lastname= "Khaled";
    const id= "123456789";

    const loginPage =pOMmanger.gotoLoginpage();
   
  const addemployee =pOMmanger.gotoaddEmployee();
   const searchemployee =pOMmanger.gotosearchEmployee();
   
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
await expect(page.getByRole("cell", {name : "123456789"})).toBeVisible();
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

        const pOMmanger = new POMmanger(page);
    const username= "Admin";
    const password= "admin123";
    const id= "123456789";

    const loginPage =pOMmanger.gotoLoginpage();

   const searchemployee =pOMmanger.gotosearchEmployee();
    const deleteemployee =pOMmanger.gotodeleteEmployee();

  
   
    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);



//add new employee senario
//await page.locator('[class="oxd-main-menu-item active"]').click();
await searchemployee.employeenavigation();

//search for emplyee after addition
await searchemployee.employeesearch(id);


//row assertions > the new employee in employee list
await expect(page.getByRole("cell", {name : "123456789"})).toBeVisible();
await expect(page.getByRole("cell", {name : "Mostafa"})).toBeVisible();
await expect(page.getByRole("cell", {name : "khaled"})).toBeVisible();


//delete employee senario
await deleteemployee.employeedelete(id);


//search for emplyee after deletion
await searchemployee.employeesearch(id);

//deletion assertion
await expect(page.getByRole("cell", {name : "123456789"})).toBeHidden();

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_');// Format as HH_MM_SS

await page.pdf({ path:`results/OrangeHR delete employee TC_${formattedDate}-${formattedTime}.pdf` ,
     displayHeaderFooter:true, printBackground :true })


});

test ('7-OrangeHR job vacancy creation TC',
    
    {tag : '@regtc'},
    async ({page})=> { 
const pOMmanger = new POMmanger(page);
        
    const username= "Admin";
    const password= "admin123";
    const jobname= "IT";
    const hiringmanager= "Ranga";
    

    const loginPage =pOMmanger.gotoLoginpage();
    const addvacancy =pOMmanger.gotoaddVacancy();
    const searchvacancy =pOMmanger.gotosearchVacancy();


    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);
//add vacancy


await addvacancy.vacancynavigation();

await addvacancy.vacancyAddition(jobname,hiringmanager) ;
await page.waitForTimeout(2000);
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
 const pOMmanger = new POMmanger(page);
        
    const username= "Admin";
    const password= "admin123";
    const employeename ="rang";
   const nobalancemessage = 'Balance not sufficient';

    const loginPage =pOMmanger.gotoLoginpage()

   const addleave =pOMmanger.gotoaddLeaveNoBalance()
    

  
   
    await loginPage.gotoLoginpage();

    await loginPage.gotoLoginassert();

    await loginPage.validLogin(username,password);


//add leave request
await addleave.leavenavigation();


//enter leave details

await addleave.leaveAddition(employeename) ;

//await page.pause();

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
 const pOMmanger = new POMmanger(page);
        
    const username= "Admin";
    const password= "admin123";
    const bylocationheader ="Employee Distribution by Location";
   

    const loginPage =pOMmanger.gotoLoginpage();

   const dashboardpage =pOMmanger.gotoDashboardpage();
    

  
   
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