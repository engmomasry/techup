

class searchEmployee

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.pim = page.getByRole("link", {name : "PIM"})
        this.employeelist = page.getByRole("link", {name : "Employee List"});
        this.idfield= page.locator('[class="oxd-input oxd-input--active"]').nth(1);
        this.searchbutton= page.getByRole("button", {name : " Search "});
    }


    async employeenavigation() 
{
await  this.pim.click();

}


async employeesearch(id) 
{
await this.page.waitForLoadState("networkidle");
await this.employeelist.click();
await this.page.waitForTimeout(2000);
await this.employeelist.click();
await this.page.waitForTimeout(2000);
await this.idfield.fill(id);
await this.searchbutton.click();
await this.page.waitForTimeout(2000);

}





}
//export the class to be usable
module.exports = {searchEmployee};