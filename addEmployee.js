

class addEmployee

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.pim = page.getByRole("link", {name : "PIM"})
        this.addbutton = page.locator('[class="oxd-button oxd-button--medium oxd-button--secondary"]');
        this.fnfield= page.getByPlaceholder("First Name");
        this.lnfield= page.getByPlaceholder("Last Name");
        this.idfield= page.locator('[class="oxd-input oxd-input--active"]').nth(1);
        this.savebutton= page.locator('[type="submit"]');
        
    }

async employeenavigation() 
{
await  this.pim.click();
await this.page.waitForLoadState("networkidle");

}



async employeeAddition(firstname,lastname,id) 
{
await this.addbutton.click();
await this.page.waitForTimeout(2000);
await this.fnfield.fill(firstname);
await this.lnfield.fill(lastname);
await this.idfield.fill(id);
await this.page.waitForTimeout(2000);
await this.savebutton.click();
await this.page.waitForTimeout(4000);

}




}
//export the class to be usable
module.exports = {addEmployee};