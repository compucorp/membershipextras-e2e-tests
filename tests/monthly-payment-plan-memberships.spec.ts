import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { IndividualCreatePage } from '../pages/individual-create.page';
import { ContactView } from '../pages/contact-view.page';
import { DateParser } from '../helper/date';

test.describe('Monthly payment plan membership ', async () => {
  let loginPage: LoginPage;
  let individualCreatePage: IndividualCreatePage;
  let contactView: ContactView;

  test.beforeEach(async ({ page }) => {
    /*loginPage = new LoginPage(page);
    await loginPage.logInAsAdmin();

    individualCreatePage = new IndividualCreatePage(page);
    await individualCreatePage.createNew();

    contactView = new ContactView(page);
    await contactView.goToMembershipsTab();*/
  });

  test('Create 1-year+rolling membership', async ({ page }) => {
    // we should install xlsx first with `npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz playwright`
    let inputData = [];

    var xlsx = require('xlsx')
  
    // Reading our test file
    var file = xlsx.readFile('./data2/test1.xlsx')
 
    var caseData = [];
    var data = xlsx.utils.sheet_to_json(file.Sheets['Master']);
    data.forEach((res) => {
      if (res['Scenario_ID'] == 'TC_001') {
        caseData = res;
      }
   })
  
   var expectedData = [];
   var data2 = xlsx.utils.sheet_to_json(file.Sheets['Data']);
   data2.forEach((res) => {
     if (res['Scenario_ID'] == caseData['Scenario_ID']) {
      expectedData.push(res);
     }
  })
   
  console.log(expectedData);
   
  });
});
