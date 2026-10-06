export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#srchtxtsticky');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.cartButton = page.locator('#crt-btn-onscroll');
    this.contactUsLabel = page.getByText('Contact Us', { exact: true }).first();
    this.menuItems = page.locator('a');
  }

  async goto() {
    await this.page.goto('https://www.greenmarknatural.com/?city=Thrissur');
  }

  async searchFor(term) {
    const searchUrl = `https://www.greenmarknatural.com/search?srchval=${encodeURIComponent(term)}&city=Thrissur`;

    await this.searchInput.fill(term);

    try {
      await this.searchButton.click();
      await this.page.waitForURL(/\/search\?srchval=/, { timeout: 2000 });
    } catch {
      await this.page.goto(searchUrl, { waitUntil: 'domcontentloaded' });
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  async getMainMenuTexts() {
    return this.page.locator('body').evaluate((body) => {
      const labels = [
        'Contact Us',
        'Hair Care',
        'Skin Care',
        'Health & Wellness',
        'Natural Foods',
        'Dietary Suppliment Capsules',
        'Hygiene Solutions',
        'Perfume',
        'Privacy Policy',
      ];

      const bodyText = body.innerText;
      return labels.filter((label) => bodyText.includes(label));
    });
  }
}
