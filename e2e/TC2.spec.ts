import { baseFixture } from '../fixtures';
import { faker } from '@faker-js/faker';
import { getUUID } from '../helpers/base';
import { IUser } from '../types/user';

baseFixture('Submitting form with empty first name', async ({app}) => {

  await app.signUp.open();
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormInputErrorMessage(app.signUp.firstNameInput, "Please fill out this field.");
});

baseFixture('Submitting form with empty last name', async ({app}) => {
  const firstName: string = faker.person.firstName() + getUUID();

  await app.signUp.open();
  await app.signUp.fillFirstNameInput(firstName);
  await app.signUp.validateFormInputErrorMessage(app.signUp.lastNameInput, "Please fill out this field.");
});

baseFixture('Submitting form with empty | incorrect email name', async ({app}) => {
  const firstName: string = faker.person.firstName() + getUUID();
  const lastName: string = faker.person.lastName();

  await app.signUp.open();
  await app.signUp.fillLastNameInput(firstName);
  await app.signUp.fillFirstNameInput(lastName);
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormInputErrorMessage(app.signUp.emailInput, "Please fill out this field.");
  await app.signUp.fillEmailInput("email");
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormInputErrorMessage(app.signUp.emailInput, "Please include an '@' in the email address. 'email' is missing an '@'.");
});

baseFixture('Submitting form with empty password | confirm password fields', async ({app}) => {
  const firstName: string = faker.person.firstName() + getUUID();
  const lastName: string = faker.person.lastName();
  const email: string = faker.internet.email();

  await app.signUp.open();
  await app.signUp.fillFirstNameInput(firstName);
  await app.signUp.fillLastNameInput(lastName);
  await app.signUp.fillEmailInput(email);
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormInputErrorMessage(app.signUp.passwordInput, "Please fill out this field.");
  await app.signUp.fillPasswordInput('password');
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormInputErrorMessage(app.signUp.confirmPasswordInput, "Please fill out this field.");
});

baseFixture('Submitting form with password less than 8 symbols', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: 'test',
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormSubmittingErrorMessage('Password must be at least 8 characters long!');
});

baseFixture('Submitting form with different values in password and confirm password inputs', async ({app}) => {
  const firstName: string = faker.person.firstName() + getUUID();
  const lastName: string = faker.person.lastName();
  const email: string = faker.internet.email();

  await app.signUp.open();
  await app.signUp.fillFirstNameInput(firstName);
  await app.signUp.fillLastNameInput(lastName);
  await app.signUp.fillEmailInput(email);
  await app.signUp.fillPasswordInput('password');
  await app.signUp.fillConfirmPasswordInput('differentPassword');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormSubmittingErrorMessage('Passwords do not match!');
});
