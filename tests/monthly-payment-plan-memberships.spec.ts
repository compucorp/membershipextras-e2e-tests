import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { IndividualCreatePage } from '../pages/individual-create.page';
import { ContactView } from '../pages/contact-view.page';
import { DateParser } from '../helper/date';
import * as data from '../data/00001/0001.json';

test.describe('Monthly payment plan membership ', async () => {
  let loginPage: LoginPage;
  let individualCreatePage: IndividualCreatePage;
  let contactView: ContactView;

  test.beforeEach(async ({ page }) => {
    //loginPage = new LoginPage(page);
    //await loginPage.logInAsAdmin();

    //individualCreatePage = new IndividualCreatePage(page);
    //await individualCreatePage.createNew();

    //contactView = new ContactView(page);
    //await contactView.goToMembershipsTab();
  });

  test('Create 1-year+rolling membership', async ({ page }) => {
    let inputData = data[1].input;
    //let expectedData = data.expected;

    let firstInstalmentDate = DateParser.parse('today');
    expect(firstInstalmentDate).toBe(3);

    await page.locator('span:has-text("Add Membership")').click();
    await page.waitForLoadState('domcontentloaded');

    await page.locator('select[name="membership_type_id\\[0\\]"]').selectOption(inputData.membership_type_org);
    await page.locator('select[name="membership_type_id\\[1\\]"]').selectOption(inputData.membership_type);
    await page.locator('form[name="Membership"] li:has-text("Payment Plan")').click();
    await page.waitForLoadState('domcontentloaded');
  
    await page.locator('.crm-membership-form-block-join_date input:nth-of-type(2)').fill(inputData.join_date);
    await page.locator('.crm-membership-form-block-start_date input:nth-of-type(2)').fill(inputData.start_date);
    await page.waitForLoadState('domcontentloaded');
  
    await page.locator('select[name="payment_plan_schedule"]').selectOption('monthly');
    await page.waitForLoadState('domcontentloaded');

    // validate installments data
    await page.locator('text=1 ' + expectedData.first_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=2 ' + expectedData.second_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=3 ' + expectedData.third_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=4 ' + expectedData.fourth_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=5 ' + expectedData.fifth_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=6 ' + expectedData.sixth_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=7 ' + expectedData.seventh_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=8 ' + expectedData.eighth_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=9 ' + expectedData.ninth_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=10 ' + expectedData.tenth_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=11 ' + expectedData.eleventh_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=12 ' + expectedData.twelveth_instalment_date + ' £ ' + expectedData.single_instalment_tax_amount + ' £ ' + expectedData.single_instalment_amount + ' Pending >> a').click();
    await page.locator('text=Sub Total Amount £ ' + expectedData.sub_total + ' >> td').first().click();
    await page.locator('text=Total Sales Tax Amount £ ' + expectedData.total_sales_tax + ' >> td').first().click();
    await page.locator('text=Total Amount £ ' + expectedData.total + ' >> td').first().click();

    await page.locator('.ui-dialog-buttonset > button').first().click();
    await page.waitForLoadState('domcontentloaded');
  
    // validate memberships count
    await page.locator('text=Memberships ' + expectedData.memberships_count).click();

    // validate the created membership data
    await page.locator('.crm-membership-join_date:has-text("' + expectedData.membership_join_date + '")').click();
    await page.locator('.crm-membership-start_date:has-text("' + expectedData.membership_start_date + '")').click();
    await page.locator('.crm-membership-end_date:has-text("' + expectedData.membership_end_date +'")').click();
    await page.locator('.crm-membership-status:has-text("' + expectedData.membership_status + '")').click();
    await page.locator('.crm-membership-auto_renew:has-text("Auto-renew active")').click();
  });
});
