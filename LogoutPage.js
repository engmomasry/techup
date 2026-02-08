
const { expect } = require('@playwright/test');

class LogoutPage

{


constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.logintitle = page.locator('[class="oxd-text oxd-text--h5 orangehrm-login-title"]');
        this.userdrop = page.locator('[class="oxd-userdropdown-img"]');
        this.logoutbutton= page.getByRole('menuitem' , {name : "Logout"});
        
    }


async validLogout() 
{


await this.userdrop.click();
await this.logoutbutton.click();


}

  async gotoLoginagain()
    {
        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await expect(this.logintitle).toHaveText('Login');
    }


}
module.exports = {LogoutPage};