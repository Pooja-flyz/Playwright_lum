export class ProductPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('h1').first();
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.buyNowButton = page.getByRole('button', { name: 'Buy Now' });
    this.cartButton = page.locator('#crt-btn-onscroll');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    try {
      await this.cartButton.click();
      await this.page.waitForURL(/\/cart/i, { timeout: 2000 });
    } catch {
      await this.page.goto('https://www.greenmarknatural.com/cart', { waitUntil: 'domcontentloaded' });
    }
  }

  async titleText() {
    return this.productTitle.textContent();
  }
}
