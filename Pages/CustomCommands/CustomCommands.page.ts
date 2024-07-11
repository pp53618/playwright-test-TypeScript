import { expect, Page } from "@playwright/test";

export class CustomCommands {
  constructor(private page: Page) {}

  async openAndCheckPage(url: string): Promise<void> {
    const response = await this.page.goto(url, { waitUntil: "networkidle" });
    const currentUrl = this.page.url();

    expect(currentUrl).toContain(url);
    expect(response?.status()).toBe(200);
  }

  async enterTextInField(param: {
    fieldSelector: string;
    value: string;
  }): Promise<void> {
    const { fieldSelector, value } = param;

    const field = this.page.locator(fieldSelector);
    await field.waitFor();
    await field.fill(value);
  }

  generateRandomEmail(): string {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `test+${randomString}@example.com`;
  }
}
