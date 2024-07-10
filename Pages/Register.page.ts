import { CustomCommands } from "./CustomCommands/CustomCommands.page";
import { Page } from "@playwright/test";

export class Register {
  constructor(private page: Page) {}
  CustomCommands = new CustomCommands(this.page);

  getFirstName = "#input-firstname";
  getLastName = "#input-lastname";
  getEmail = "#input-email";
  getTelephone = "#input-telephone";
  getPassword = "#input-password";
  getConfirmPassword = "#input-confirm";

  async enterPersonalDetails(
    name: string,
    lastName: string,
    email: string,
    telephone: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    const fields = [
      { fieldSelector: this.getFirstName, value: name },
      { fieldSelector: this.getLastName, value: lastName },
      { fieldSelector: this.getEmail, value: email },
      { fieldSelector: this.getTelephone, value: telephone },
      { fieldSelector: this.getPassword, value: password },
      { fieldSelector: this.getConfirmPassword, value: confirmPassword },
    ];

    for (const field of fields)
      await this.CustomCommands.enterTextInField(field);
  }
}
