

class searchVacancy

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.recruitment =  page.getByRole("link", {name : "Recruitment"});
        this.vacancies = page.getByRole("link", {name : "Vacancies"});
       
        this.jobtitlefield= page.locator('[class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"]').nth(0);
        this.jobtitleddl= page.getByRole("option", {name : "Software Engineer"});
        this.searchbutton= page.getByRole("button", {name : " Search "});
    }

async vacancynavigation() 
{

await   this.vacancies.click();

}



async vacancysearch() 
{


await  this.jobtitlefield.click();
await this.jobtitleddl.click();

await this.page.waitForTimeout(2000);
await this.searchbutton.click();
await this.page.waitForTimeout(2000);

}





}
//export the class to be usable
module.exports = {searchVacancy};