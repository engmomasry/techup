const { expect } = require('@playwright/test');

class deleteEmployee

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        
        this.rowselect = page.locator('[class="oxd-icon bi-check oxd-checkbox-input-icon"]').nth(1);
        this.trashselect= page.locator('[class="oxd-icon bi-trash"]');
        this.deletebuttonpopup= page.getByRole('button' ,{name:" Yes, Delete "});
       
        
    }

async employeedelete() 
{

await this.rowselect.check();
await this.trashselect.click();
await this.page.on('dialog' , dialog => dialog.accept());
await this.deletebuttonpopup.click();

}





}
//export the class to be usable
module.exports = {deleteEmployee};