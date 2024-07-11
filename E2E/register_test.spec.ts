import { registerUrl } from "../Urls/test_url";
import test, { Pages } from "../Pages/POMFixtures/POMFixtures";
import userData from "../Test_Data/users_data.json";

let pages: Pages;

test.describe("Register the account", () => {
  test.beforeEach(async ({ CustomCommandsPage, RegisterPage }) => {
    await CustomCommandsPage.openAndCheckPage(registerUrl);
    pages = { CustomCommandsPage, RegisterPage };
  });

  const correctUserData = userData.find((user) => user.idTest === "1");

  async function executeRegisterTest(user: any): Promise<void> {
    await pages.RegisterPage.enterPersonalDetails(
      user.firstNameValue,
      user.lastNameValue,
      pages.CustomCommandsPage.generateRandomEmail(),
      user.telephoneValue,
      user.passwordValue,
      user.confirmPasswordValue
    );
  }

  test.describe("Poprawny użytkownik", () => {
    test(`Test wprowadzania ${correctUserData?.testNameValue} = ${correctUserData?.idTest}`, async () => {
      await executeRegisterTest(correctUserData);
    });
  });
});
