import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { IndividualCreatePage } from '../pages/individual-create.page';
import { ContactView } from '../pages/contact-view.page';

test.describe('Monthly payment plan membership ', async () => {
  let loginPage: LoginPage;
  let individualCreatePage: IndividualCreatePage;
  let contactView: ContactView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.logInAsAdmin();

    individualCreatePage = new IndividualCreatePage(page);
    await individualCreatePage.createNew();

    contactView = new ContactView(page);
    await contactView.goToMembershipsTab();
  });

  test('Create 1-year+rolling membership', async ({ page }) => {
    await page.locator('span:has-text("Add Membership")').click();
    await page.waitForLoadState('domcontentloaded');

    await page.locator('select[name="membership_type_id\\[0\\]"]').selectOption('3');
    await page.locator('select[name="membership_type_id\\[1\\]"]').selectOption('1');
    await page.locator('form[name="Membership"] li:has-text("Payment Plan")').click();
    await page.waitForLoadState('domcontentloaded');
  
    await page.locator('.crm-membership-form-block-join_date input:nth-of-type(2)').fill('01/01/2022');
    await page.locator('.crm-membership-form-block-start_date input:nth-of-type(2)').fill('01/01/2022');
    await page.waitForLoadState('domcontentloaded');
  
    await page.locator('select[name="payment_plan_schedule"]').selectOption('monthly');
    await page.waitForLoadState('domcontentloaded');

    // validate installments data
    await page.locator('text=1 1st January 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=2 1st February 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=3 1st March 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=4 1st April 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=5 1st May 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=6 1st June 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=7 1st July 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=8 1st August 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=9 1st September 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=10 1st October 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=11 1st November 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=12 1st December 2022 £ 2.00 £ 12.00 Pending >> a').click();
    await page.locator('text=Sub Total Amount £ 120.00 >> td').first().click();
    await page.locator('text=Total Sales Tax Amount £ 24.00 >> td').first().click();
    await page.locator('text=Total Amount £ 144.00 >> td').first().click();

    await page.locator('.ui-dialog-buttonset > button').first().click();
    await page.waitForLoadState('domcontentloaded');
  
    // validate memberships count
    await page.locator('text=Memberships 1').click();

    // validate the created membership data
    await page.locator('.crm-membership-join_date:has-text("1st January 2022")').click();
    await page.locator('.crm-membership-start_date:has-text("1st January 2022")').click();
    await page.locator('.crm-membership-end_date:has-text("31st December 2022")').click();
    await page.locator('.crm-membership-status:has-text("Current")').click();
    await page.locator('.crm-membership-auto_renew:has-text("Auto-renew active")').click();
  });
});
