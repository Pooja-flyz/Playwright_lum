import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Green Mark Natural shopping flow', () => {
  test('verify the page title and main menu items', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(page).toHaveTitle(/Green Mark Natural Solutions/i);
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
    await expect(homePage.searchButton).toBeEnabled();
    await expect(homePage.cartButton).toBeVisible();
    await expect(homePage.cartButton).toBeEnabled();
    await expect(homePage.contactUsLabel).toBeVisible();

    const menuTexts = await homePage.getMainMenuTexts();
    expect(menuTexts).toEqual(
      expect.arrayContaining(['Contact Us', 'Hair Care', 'Skin Care', 'Health & Wellness'])
    );
    expect(menuTexts.length).toBeGreaterThan(5);
  });

  test('verify all main menu texts on the homepage', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    const menuTexts = await homePage.getMainMenuTexts();
    const expectedTexts = [
      'Contact Us',
      'Hair Care',
      'Skin Care',
      'Health & Wellness',
      'Natural Foods',
      'Dietary Suppliment Capsules',
      'Hygiene Solutions',
      'Perfume',
    ];

    for (const text of expectedTexts) {
      expect(menuTexts).toContain(text);
    }
  });

  test('search for shampoo and verify results and sort options', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);

    await homePage.goto();
    await homePage.searchFor('shampoo');
    await searchPage.waitForResults();

    const resultNames = await searchPage.getSearchResultNames();
    expect(resultNames.length).toBeGreaterThan(0);
    expect(resultNames.some((name) => /shampoo/i.test(name))).toBeTruthy();

    const sortOptions = await searchPage.getSortOptions();
    expect(sortOptions).toEqual([
      'Popularity',
      'Newest',
      'Price Low to High',
      'Price High to Low',
    ]);
    expect(sortOptions.length).toBe(4);
  });

  test('click the first shampoo product and verify product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await homePage.searchFor('shampoo');
    await searchPage.waitForResults();

    await expect(searchPage.searchResultLinks.first()).toBeVisible();
    await searchPage.openFirstProduct();

    await expect(page).toHaveURL(/\/pid-/i);
    await expect(productPage.productTitle).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toBeEnabled();
    await expect(productPage.buyNowButton).toBeVisible();
  });

  test('add a shampoo product to the cart and verify the cart page opens', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await homePage.searchFor('shampoo');
    await searchPage.waitForResults();

    await searchPage.openFirstProduct();

    await expect(page).toHaveURL(/\/pid-/i);
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toBeEnabled();
    await productPage.addToCart();

    await productPage.goToCart();
    await expect(page).toHaveURL(/\/cart/i);
  });
});
