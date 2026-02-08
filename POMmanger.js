//importing all the classes

const {LoginPage} = require ('../pageobjects/LoginPage');
const { LogoutPage } = require ('../pageobjects/LogoutPage');
const { addEmployee } = require ('../pageobjects/addEmployee');
const { searchEmployee } = require ('../pageobjects/searchEmployee');
const { deleteEmployee } = require ('../pageobjects/deleteEmployee');
const {addVacancy} = require ('../pageobjects/addVacancy');
const {searchVacancy} = require ('../pageobjects/searchVacancy');
const { addLeaveNoBalance } = require ('../pageobjects/addLeaveNoBalance');
const { DashboardPage } = require ('../pageobjects/DashboardPage');

class POMmanger 

{

    constructor(page)
    {
        this.page =page;
        //declairing all new objects
        this.loginPage = new LoginPage(this.page);
        this.logoutPage = new LogoutPage(this.page);
        this.addemployee = new addEmployee(this.page);
        this.searchemployee = new searchEmployee(this.page);
        this.deleteemployee = new deleteEmployee(this.page);
        this.addvacancy = new addVacancy(this.page);
        this.searchvacancy = new searchVacancy(this.page);
        this.addleave = new addLeaveNoBalance (this.page);
        this.dashboardpage = new DashboardPage (this.page);
    
    }

    gotoLoginpage()
    {
        return this.loginPage;

    }
     
     gotoLogoutPage()
    {
        return this.logoutPage;

    }
    
    gotoaddEmployee()
    {
        return this.addemployee;

    }
     
    gotosearchEmployee()
    {
        return this.searchemployee;

    }
     
    
    gotodeleteEmployee()
    {
        return this.deleteemployee;

    } 
    
    gotoaddVacancy()
    {
        return this.addvacancy;

    }

     gotosearchVacancy()
    {
        return this.searchvacancy;

    }

      gotoaddLeaveNoBalance()
    {
        return this.addleave;

    }

  gotoDashboardpage()
    {
        return this.dashboardpage;

    }


}
//export the class to be usable
module.exports = {POMmanger};