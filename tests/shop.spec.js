import { test, expect } from '@playwright/test';

test.describe('shop checking', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://themes.woocommerce.com/storefront/shop/');
  });
  test('adding item to cart', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Add “Lowepro Slingshot Edge' })
      .click();
    await page.getByTitle('View cart').click();

    await expect(
      page.getByRole('cell', {
        name: 'Lowepro Slingshot Edge 250 AW',
        exact: true,
      }),
    ).toHaveText('Lowepro Slingshot Edge 250 AW');
  });

  test('adding few items to cart', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Add “Lowepro Pro Roller x300' })
      .click();
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'Add “Nikon MB-D17 Multi' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('link', { name: 'Add “Nikon SB-700 AF' }).click();
    await page.waitForTimeout(1000);

    await page
      .getByRole('link', { name: 'Add “Nikon AF-S Nikkor 300mm' })
      .click();
    await page.waitForTimeout(1000);

    await page.locator('.cart-contents').click();

    const expectedProduct = page.locator('.product-name > a', {
      hasText: 'Nikon MB-D17 Multi Battery Power Pack',
    });

    await expect(expectedProduct).toHaveText(
      'Nikon MB-D17 Multi Battery Power Pack',
    );
  });
});
