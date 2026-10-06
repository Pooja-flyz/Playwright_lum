export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProductLinks = page.locator('a[href*="/pid-"]');
  }

  async getCartProductNames() {
    return this.cartProductLinks.evaluateAll((items) =>
      items.map((item) => item.textContent.trim()).filter(Boolean)
    );
  }

  async productIsVisible(productName) {
    const bodyText = await this.page.locator('body').innerText();
    return bodyText.toLowerCase().includes(productName.toLowerCase());
  }
}
