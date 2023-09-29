import { baseFixture } from '../fixtures';
import { faker } from '@faker-js/faker';
import { getUUID } from '../helpers/base';

baseFixture('Sign Up without avatar', async ({ app }) => {
  const firstName: string = faker.person.firstName()+getUUID();
  const lastName: string = faker.person.lastName();
  const email: string = faker.internet.email();
  const password: string = faker.internet.password();

  await app.signUp.open();
  await app.signUp.fillFirstNameInput(firstName);
  await app.signUp.fillLastNameInput(lastName);
  await app.signUp.fillEmailInput(email);
  await app.signUp.fillPasswordInput(password);
  await app.signUp.fillConfirmPasswordInput(password);
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${firstName} ${lastName}`,
    expectedEmail: email,
    isAvatarPresented: false
  });
  await app.successSignUp.clickBackButton()
  await app.signUp.isLoaded();
});

baseFixture('Sign Up with avatar', async ({ app }) => {
  const firstName: string = faker.person.firstName()+getUUID();
  const lastName: string = faker.person.lastName();
  const email: string = faker.internet.email();
  const password: string = faker.internet.password();

  await app.signUp.open();
  await app.signUp.fillFirstNameInput(firstName);
  await app.signUp.fillLastNameInput(lastName);
  await app.signUp.fillEmailInput(email);
  await app.signUp.fillPasswordInput(password);
  await app.signUp.fillConfirmPasswordInput(password);
  await app.signUp.uploadAvatar('fixtures/test_files/image.jpg');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${firstName} ${lastName}`,
    expectedEmail: email,
    isAvatarPresented: true
  });
  await app.successSignUp.clickBackButton()
  await app.signUp.isLoaded();
});
