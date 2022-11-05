import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { IndividualCreatePage } from '../pages/individual-create.page';
import { ContactView } from '../pages/contact-view.page';
import { DateHelper } from '../helper/date';
import { XlsxTestDataHelper } from '../helper/xlsx';
import dayjs from 'dayjs';

test.describe('First Test Group', async () => {
  let loginPage: LoginPage;
  let individualCreatePage: IndividualCreatePage;
  let contactView: ContactView;

  test.beforeEach(async ({ page }, testInfo) => {
    // this should be added to each test group to check if the tests
    // should run on this project.
    
    var isValidProject = XlsxTestDataHelper.isValidProject(testInfo.project.name, testInfo.title);
    if (!isValidProject) {
      test.skip(true, 'This test is not valid for this project');
    }

    loginPage = new LoginPage(page);
    await loginPage.logInAsAdmin();

    individualCreatePage = new IndividualCreatePage(page);
    await individualCreatePage.createNew();

    contactView = new ContactView(page);
    await contactView.goToMembershipsTab();
  });

  test('TC_001', async ({ page }, testInfo) => {
    var membershipSheetData = XlsxTestDataHelper.readSheetData('Membership', testInfo.title);

    var membershipOrg = XlsxTestDataHelper.getMappedValue(membershipSheetData[0]['membership_type_org'], testInfo.project.name);
    var membershipTypeLabel = XlsxTestDataHelper.getMappedValue(membershipSheetData[0]['membership_type'], testInfo.project.name);
    var membershipJoinDate = DateHelper.parse(membershipSheetData[0]['membership_join_date']);
    
    var membershipStartDateRaw = XlsxTestDataHelper.getMappedValue(membershipSheetData[0]['membership_start_date'], testInfo.project.name);
    var membershipStartDate = DateHelper.parse(membershipStartDateRaw);

    await page.locator('span:has-text("Add Membership")').click();
    await page.waitForLoadState('domcontentloaded');
    
    await page.locator('select[name="membership_type_id\\[0\\]"]').selectOption({ label: membershipOrg });
    await page.locator('select[name="membership_type_id\\[1\\]"]').selectOption({ label: membershipTypeLabel });

    await page.locator('form[name="Membership"] li:has-text("Payment Plan")').click();
    await page.waitForLoadState('domcontentloaded');

    await page.locator('select[name="payment_plan_schedule"]').selectOption('monthly');
    await page.waitForLoadState('domcontentloaded');
    
    await page.locator('.crm-membership-form-block-join_date input:nth-of-type(2)').fill(membershipJoinDate);
    await page.locator('.crm-membership-form-block-start_date input:nth-of-type(2)').fill(membershipStartDate);
    await page.waitForLoadState('domcontentloaded');

    await page.locator('.ui-dialog-buttonset > button').first().click();
    await page.waitForLoadState('domcontentloaded');
  
    // validate Memberships count
    await page.locator('text=Memberships 1').click();
  
    // validate the created membership data
    await page.locator('.crm-membership-start_date:has-text("1st January 2022")').click();
    await page.locator('.crm-membership-end_date:has-text("31st December 2022")').click();
    await page.locator('.crm-membership-status:has-text("New")').click();
    await page.locator('.crm-membership-auto_renew:has-text("Auto-renew active")').click();

    // validate Contributions count
    await page.locator('text=Contributions 12').click();
    await page.waitForLoadState('domcontentloaded');

    for(var i= 0; i < 12; i++) {
      var row = membershipSheetData[i];

      var expectedTotalAmount = XlsxTestDataHelper.getMappedValue(row['Total'], testInfo.project.name);
      expectedTotalAmount = parseFloat(expectedTotalAmount).toFixed(2);
      var amountSelector = 'td.crm-contribution-amount:has-text("£ ' + expectedTotalAmount +'")';
      await page.locator(amountSelector).nth(i).click();

      var expectedStatus = row['Status'];
      var statusSelector = 'td.crm-contribution-status:has-text("' + expectedStatus +'")';
      await page.locator(statusSelector).nth(i).click();

      
      const advancedFormat = require("dayjs/plugin/advancedFormat");
      dayjs.extend(advancedFormat);
      var expectedDate = dayjs(membershipStartDate).add((i), 'months').format('Do MMMM YYYY');
      var receiveSelector = 'td.crm-contribution-receive_date:has-text("' + expectedDate +'")';
      await page.locator(receiveSelector).click();
    }
  });
});
