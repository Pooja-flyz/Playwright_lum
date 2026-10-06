export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchResultLinks = page.locator('a[href*="/pid-"]');
    this.sortByLabel = page.getByText('Sort By', { exact: true });
    this.sortOptions = page.locator('.gnGM_list-wrap .l50f_item-text');
  }

  async getSearchResultNames() {
    return this.searchResultLinks.evaluateAll((items) =>
      items.map((item) => item.textContent.trim()).filter(Boolean)
    );
  }

  async waitForResults() {
    await this.searchResultLinks.first().waitFor({ state: 'visible' });
  }

  async getSortOptions() {
    return this.sortOptions.allTextContents().then((options) =>
      options.map((option) => option.trim()).filter(Boolean)
    );
  }

  async openFirstProduct() {
    await this.searchResultLinks.first().click();
  }
}
