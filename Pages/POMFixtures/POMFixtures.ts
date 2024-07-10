import { expect, test as baseTest } from "playwright/test";
import { CustomCommands } from "../CustomCommands/CustomCommands.page";
import { Register } from "../Register.page";

type Pages = {
  CustomCommandsPage: CustomCommands;
  RegisterPage: Register;
};

const testPages = baseTest.extend<Pages>({
  CustomCommandsPage: async ({ page }, use) => {
    await use(new CustomCommands(page));
  },

  RegisterPage: async ({ page }, use) => {
    await use(new Register(page));
  },
});

const test = testPages;
export { test as default, expect, Pages };
