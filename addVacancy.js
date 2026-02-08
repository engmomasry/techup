

class addVacancy

{

    constructor(page)
    {
        this.page =page;//to be able to use page method allover the class
        //storing locators
        this.recruitment =  page.getByRole("link", {name : "Recruitment"});
        this.vacancies = page.getByRole("link", {name : "Vacancies"});
        this.addbutton= page.getByRole("button", {name : " Add "});
        this.jobnamefield= page.locator('[class="oxd-input oxd-input--active"]').nth(1);
        this.jobtitlefield= page.locator('[class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"]');
        this.jobtitleddl= page.getByRole("option", {name : "Software Engineer"});
        this.hiringmanagerfield= page.getByPlaceholder("Type for hints...");
        this.hiringmanagerddl=page.getByRole('option',{name : "Ranga  Akunuri"}).nth(0);
        this.savebutton= page.locator('[type="submit"]');
        
    }

async vacancynavigation() 
{
await  this.recruitment.click();
await   this.vacancies.click();
await this.page.waitForLoadState("networkidle");

}



async vacancyAddition(jobname,hiringmanager) 
{
await this.addbutton.click();
await this.page.waitForTimeout(2000);
await this.jobnamefield.fill(jobname);
await this.jobtitlefield.click();
await this.jobtitleddl.click();
await this.hiringmanagerfield.pressSequentially(hiringmanager);
await this.hiringmanagerddl.click();
await this.savebutton.click();


}


}
//export the class to be usable
module.exports = {addVacancy};