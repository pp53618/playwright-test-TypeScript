import { expect, Page } from "@playwright/test";

export class CustomCommands {
  constructor(private page: Page) {}

  async openAndCheckPage(url: string): Promise<void> {
    const response = await this.page.goto(url, { waitUntil: "networkidle" });
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(url);
    expect(response?.status()).toBe(200);
  }

  async enterTextInField(param: { fieldSelector: string; value: string }): Promise<void> {
    const { fieldSelector, value } = param;
    const field = this.page.locator(fieldSelector);
    await field.waitFor();
    await field.fill(value);
  }

  async clickButton(buttonSelector: string): Promise<void> {
    const button = this.page.locator(buttonSelector);
    await button.waitFor();
    await button.click();
  }

  async checkCheckbox(checkboxSelector: string): Promise<void> {
    const checkbox = this.page.locator(checkboxSelector);
    await checkbox.waitFor();
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
  }

  async checkMessage(selector: string, expectedMessage: string): Promise<void> {
    const confirmationSelector = selector;
    const confirmationElement = this.page.locator(confirmationSelector);
    await confirmationElement.waitFor();
    const actualMessage = await confirmationElement.textContent();
    expect(actualMessage).toContain(expectedMessage);
  }

  generateRandomEmail(): string {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `test+${randomString}@example.com`;
  }
}
