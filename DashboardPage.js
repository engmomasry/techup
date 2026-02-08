const { expect } = require('@playwright/test');

class DashboardPage 

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.dashboard =page.locator('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]');
        this.piechartlocation = page.locator('[class="orangehrm-dashboard-widget-header"]').last();
    }

    async dashboardnavigation()
    {
        await this.dashboard.click();;


    }

     async dashboardassert(bylocationheader)
    {


//dashboard elements
//widget assertions
await expect(this.piechartlocation).toHaveText(bylocationheader);


    }



}
//export the class to be usable
module.exports = {DashboardPage};