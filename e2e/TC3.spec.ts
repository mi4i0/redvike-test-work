import { baseFixture } from '../fixtures';
import { IUser } from '../types/user';
import { faker } from '@faker-js/faker';
import { getUUID } from '../helpers/base';

baseFixture('Check of slider error message and saving data after sliding captcha slider', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/jpeg.jpeg');
  await app.signUp.moveSlider(50);
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormSubmittingErrorMessage('Please solve the captcha!');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${user.firstName} ${user.lastName}`,
    expectedEmail: user.email,
    isAvatarPresented: true
  });
});
