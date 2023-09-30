import { baseFixture } from '../fixtures';
import { faker } from '@faker-js/faker';
import { getUUID } from '../helpers/base';
import { IUser } from '../types/user';

baseFixture('Sign Up without avatar', async ({ app }) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${user.firstName} ${user.lastName}`,
    expectedEmail: user.email,
    isAvatarPresented: false
  });
  await app.successSignUp.clickBackButton()
  await app.signUp.isLoaded();
});
