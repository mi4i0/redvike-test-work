import { baseFixture } from '../fixtures';
import { faker } from '@faker-js/faker';
import { getUUID } from '../helpers/base';
import { IUser } from '../types/user';

baseFixture('Sign Up with avatar in .jpg format', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/image.jpg');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${user.firstName} ${user.lastName}`,
    expectedEmail: user.email,
    isAvatarPresented: true
  });
});

baseFixture('Sign Up with avatar in .jpeg format', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/jpeg.jpeg');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${user.firstName} ${user.lastName}`,
    expectedEmail: user.email,
    isAvatarPresented: true
  });
});

baseFixture('Sign Up with avatar in .bmp format', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/bmp.bmp');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${user.firstName} ${user.lastName}`,
    expectedEmail: user.email,
    isAvatarPresented: true
  });
});

baseFixture('Sign Up with avatar in .gif format', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/gif.gif');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${user.firstName} ${user.lastName}`,
    expectedEmail: user.email,
    isAvatarPresented: true
  });
});

baseFixture('Sign Up with avatar in .png format', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/png.png');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.successSignUp.isLoaded();
  await app.successSignUp.checkFormSubmission({
    expectedFullName: `${user.firstName} ${user.lastName}`,
    expectedEmail: user.email,
    isAvatarPresented: true
  });
});

baseFixture('Submitting form with invalid image type (.svg)', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/logo.svg');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormSubmittingErrorMessage('Invalid image file.');
});

baseFixture('Check of uploading avatar file with size more that 2 MB', async ({app}) => {
  const user: IUser = {
    firstName: faker.person.firstName() + getUUID(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await app.signUp.open();
  await app.signUp.fillFormWithData(user);
  await app.signUp.uploadAvatar('fixtures/test_files/more_than_2mb.jpg');
  await app.signUp.moveSlider();
  await app.signUp.clickSubmitButton();
  await app.signUp.validateFormSubmittingErrorMessage('File size must be less than 2 MB.');
});
