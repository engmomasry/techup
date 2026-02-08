const { expect } = require('@playwright/test');

class LoginPage 

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.loginbutton = page.getByRole("button", {name : " Login "});
        this.usernamefield= page.getByPlaceholder("Username");
        this.passwordfield= page.getByPlaceholder("Password");
        this.forgetpassword= page.locator('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]');
    }

    async gotoLoginpage()
    {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/");


    }

     async gotoLoginassert()
    {


//varify login elements
//visability assertions
await expect(this.usernamefield).toBeVisible();
await expect(this.passwordfield).toBeVisible();
await expect (this.loginbutton).toBeVisible();
await expect (this.forgetpassword).toBeVisible();
//accessibality assertions
await expect(this.usernamefield).toBeEditable();
await expect (this.passwordfield).toBeEditable();
await expect (this.loginbutton).toBeEnabled();
await expect (this.forgetpassword).toBeEnabled();
    }


async validLogin(username,password) 
{

await this.usernamefield.fill(username);
await this.passwordfield.fill(password);
await this.loginbutton.click();


}



}
//export the class to be usable
module.exports = {LoginPage};