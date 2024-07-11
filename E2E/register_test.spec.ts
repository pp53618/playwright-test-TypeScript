import { registerUrl } from "../Urls/test_url";
import test, { Pages } from "../Pages/POMFixtures/POMFixtures";
import userData from "../Test_Data/users_data.json";
import messages from "../Test_Data/messages.json";

let pages: Pages;

test.describe("Register the account", () => {
  test.beforeEach(async ({ CustomCommandsPage, RegisterPage }) => {
    await CustomCommandsPage.openAndCheckPage(registerUrl);
    pages = { CustomCommandsPage, RegisterPage };
  });

  const registerGroupPositive = userData.filter((user) => ["1", "2"].includes(user.idTest));
  const registerGroupValidation = userData.filter((user) => ["3", "4", "5"].includes(user.idTest));

  async function executeRegisterTest(user: any): Promise<void> {
    let emailValue = pages.CustomCommandsPage.generateRandomEmail();
    if ("5".includes(user.idTest)) {
      emailValue = user.emailValue;
    }

    await pages.RegisterPage.enterPersonalDetails(
      user.firstNameValue,
      user.lastNameValue,
      emailValue,
      user.telephoneValue,
      user.passwordValue,
      user.confirmPasswordValue
    );

    await pages.CustomCommandsPage.checkCheckbox(pages.RegisterPage.checkboxPrivacyPolicy);
    await pages.CustomCommandsPage.clickButton(pages.RegisterPage.BtnContinue);

    if (user.idTest !== "3" && user.idTest !== "4" && user.idTest !== "5") {
      await pages.RegisterPage.checkConfirmRegisterMessage(messages.Messages.confirmRegisterUser);
    }
    if (user.idTest !== "1" && user.idTest !== "2") {
      await pages.RegisterPage.checkFailedRegisterMessages(messages.Messages.failedRegisterUser);
    }
  }

  test.describe("Rejestracja użytkonika testy od 1 do 2", () => {
    registerGroupPositive.forEach((user) => {
      test(`Rejestracja ${user.testNameValue} = ${user?.idTest}`, async () => {
        await executeRegisterTest(user);
      });
    });
  });

  test.describe("Rejestracja użytkonika testy od 3 do 5", () => {
    registerGroupValidation.forEach((user) => {
      test(`Rejestracja ${user.testNameValue} = ${user?.idTest}`, async () => {
        await executeRegisterTest(user);
      });
    });
  });
});
