import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { MembershipType } from '../pages/membership-type.page';

test.describe('Monthly payment plan membership ', async () => {
  let loginPage: LoginPage;
  let membershipTypeForm: MembershipType;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.logInAsAdmin();

    membershipTypeForm = new MembershipType(page)
    await page.goto(membershipTypeForm.getAbsolutePageUrl());
  });

  test('Annual pro-rata calculation method field is required for fixed memberships', async ({ page }) => {
    await page.locator('input[name="name"]').fill('testtype1');

    await page.locator('text=- select Contact -').click();
    await page.locator('text=Membership Organization * Search by name/email or id...Refine search...Contact T >> input[role="combobox"]').fill('def');
    await page.locator('text=Default Organization').click();

    await page.locator('text=- select - Financial Type * Financial Type * >> span[role="presentation"]').click();
    await page.locator('div[role="option"]:has-text("Member Dues")').click();

    await page.locator('span:has-text("- select Membership Type Plan -")').click();
    await page.locator('div[role="option"]:has-text("Fixed")').click();

    await page.locator('span:has-text("- select Membership Type Duration Unit -")').click();
    await page.locator('div[role="option"]:has-text("year")').click();

    await page.locator('[aria-label="Fixed Period Start Day month"]').selectOption('1');

    await page.locator('[id="_qf_MembershipType_next-bottom"]').click();
    await page.waitForLoadState('domcontentloaded')

    await page.locator('#membership_type_annual_pro_rata_calculation:has-text("This field is required.")').click();
  });

  test('Fixed membership type does not support monthly duration', async ({ page }) => {
    await page.locator('input[name="name"]').fill('testtype2');

    await page.locator('text=- select Contact -').click();
    await page.locator('text=Membership Organization * Search by name/email or id...Refine search...Contact T >> input[role="combobox"]').fill('def');
    await page.locator('text=Default Organization').click();

    await page.locator('text=- select - Financial Type * Financial Type * >> span[role="presentation"]').click();
    await page.locator('div[role="option"]:has-text("Member Dues")').click();

    await page.locator('span:has-text("- select Membership Type Plan -")').click();
    await page.locator('div[role="option"]:has-text("Fixed")').click();

    await page.locator('span:has-text("- select Membership Type Duration Unit -")').click();
    await page.locator('div[role="option"]:has-text("month")').click();

    await page.locator('text=- select - Annual Pro-rata Calculation >> span[role="presentation"]').click();
    await page.locator('div[role="option"]:has-text("By months")').click();

    await page.locator('[id="_qf_MembershipType_next-bottom"]').click();
    await page.waitForLoadState('domcontentloaded')

    await page.locator('.crm-membership-type-form-block-duration_unit_interval:has-text("Fixed period membership type only supports 1 year duration.")').click();
  });
});
