import { expect, Locator } from "@playwright/test";
import { AppPage } from '../abstractClass';

export class SignUp extends AppPage {
  public pagePath: string = '/';

  firstNameInput: Locator = this.page.locator('[name="first_name"]');
  lastNameInput: Locator = this.page.locator('[name="last_name"]');
  emailInput: Locator = this.page.locator('[name="email"]');
  passwordInput: Locator = this.page.locator('[name="password"]');
  confirmPasswordInput: Locator = this.page.locator('[name="confirm_password"]');
  private formHeading: Locator = this.page.getByRole('heading', {name: 'Application Form'});
  private avatarInput: Locator = this.page.locator('[name="avatar"]');
  private sliderTrack: Locator = this.page.locator('#slider-track');
  private submitButton: Locator = this.page.locator('[value="Submit"]');
  private submittingFormErrorItem: Locator = this.page.locator('ul>li');

  async expectLoaded() {
    await expect(this.formHeading, 'Expected SignUp page to be opened').toBeVisible();
  }

  async fillFirstNameInput(text: string): Promise<void> {
    await this.firstNameInput.focus();
    await this.firstNameInput.fill(text);
  }

  async fillLastNameInput(text: string): Promise<void> {
    await this.lastNameInput.focus();
    await this.lastNameInput.fill(text);
  }

  async fillEmailInput(text: string): Promise<void> {
    await this.emailInput.focus();
    await this.emailInput.fill(text);
  }

  async fillPasswordInput(text: string): Promise<void> {
    await this.passwordInput.focus();
    await this.passwordInput.fill(text);
  }

  async fillConfirmPasswordInput(text: string): Promise<void> {
    await this.confirmPasswordInput.focus();
    await this.confirmPasswordInput.fill(text);
  }

  async uploadAvatar(filePath: string): Promise<void> {
    await this.avatarInput.setInputFiles(filePath);
  }

  async moveSlider(sliderMovementPercentage: number = 100): Promise<void> {
    if (sliderMovementPercentage < 0 || sliderMovementPercentage > 100) {
      throw new Error('Invalid sliderMovementPercentage. It should be between 0 and 100.');
    }

    const sliderOffsetWidth = await this.sliderTrack.evaluate((el: HTMLElement) => {
      return el.getBoundingClientRect().width;
    });
    const newOffsetWidth = (sliderOffsetWidth * sliderMovementPercentage) / 100;

    await this.sliderTrack.hover({position: {x: 0, y: 0}});
    await this.page.mouse.down();
    await this.sliderTrack.hover({force: true, position: {x: newOffsetWidth, y: 0}});
    await this.page.mouse.up();
  }

  async clickSubmitButton(isForce: boolean = false): Promise<void> {
    await this.submitButton.click({force: isForce});
  }

  async validateFormInputErrorMessage(element: Locator, expectedErrorMessages: string): Promise<void> {
    const validationMessage: string = await element.evaluate((element: HTMLElement) => {
      const input: HTMLInputElement = element as HTMLInputElement;
      return input.validationMessage;
    });

    expect(validationMessage).toContain(expectedErrorMessages);
  }

  async validateFormSubmittingErrorMessage(text: string): Promise<void> {
    await expect(this.submittingFormErrorItem).toContainText(text);
  }

  async fillFormWithData({firstName, lastName, email, password}: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  }): Promise<void> {
    await this.fillFirstNameInput(firstName);
    await this.fillLastNameInput(lastName);
    await this.fillEmailInput(email);
    await this.fillPasswordInput(password);
    await this.fillConfirmPasswordInput(password);
  }
}
