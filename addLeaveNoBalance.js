
const { expect } = require('@playwright/test');
class addLeaveNoBalance

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.leave = page.getByRole("link", {name : "Leave"});
        this.assignleave = page.getByRole("link", {name : "Assign Leave"});
       
        this.employeenamefield= page.getByPlaceholder("Type for hints...");
        this.employeenameddl=page.getByRole('option',{name : "Ranga  Akunuri"}).nth(0);
        this.leavetypefield= page.locator('[class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"]');
        this.leavetypeddl=page.getByRole("option", {name : "CAN - Personal"});

        this.calendarfield= page.locator('[class="oxd-icon bi-calendar oxd-date-input-icon"]').nth(0);
        this.month=page.getByText("January");
        this.day=page.getByText("30");
        this.nobalancemsg=page.locator('[class="oxd-text oxd-text--p orangehrm-leave-balance-text --error"]');

       
        
    }

async leavenavigation() 
{
await  this.leave.click();
await   this.assignleave.click();
await this.page.waitForLoadState("networkidle");

}



async leaveAddition(employeename) 
{
await this.employeenamefield.pressSequentially(employeename);
await this.employeenameddl.click();
await this.leavetypefield.click();
await this.leavetypeddl.click();;
await this.calendarfield.click();
await this.month.click();
await this.day.click();

}

     async nobalanceassert(nobalancemessage)
    {



//no balance assertions
await expect(this.nobalancemsg).toHaveText(nobalancemessage);





    }
}
//export the class to be usable
module.exports = {addLeaveNoBalance};