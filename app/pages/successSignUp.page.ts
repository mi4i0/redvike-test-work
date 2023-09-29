import { expect, Locator } from "@playwright/test";
import { AppPage } from '../abstractClass';

export class SuccessSignUp extends AppPage {
  public pagePath: string = '/success';

  private formHeading: Locator = this.page.getByRole('heading', {name: 'Successful Form Submissions'});
  private avatar = this.page.locator('img').last();
  private backButton: Locator = this.page.locator('[href="/"]');
  private listItemSelector: string = 'ul > li';
  async expectLoaded() {
    await expect(this.formHeading, 'Expected Success SignUp page to be opened').toBeVisible();
  }

  async checkFormSubmission({
    expectedFullName,
    expectedEmail,
    isAvatarPresented
  }: {
    expectedFullName: string,
    expectedEmail: string,
    isAvatarPresented: boolean
  }) {
    const listItemContent = await this.page.$eval(this.listItemSelector, el => el.textContent || '');

    const nameLabelIndex = listItemContent.indexOf('Name:');
    const emailLabelIndex = listItemContent.indexOf('Email:');
    const avatarLabelIndex = listItemContent.indexOf('Avatar:');
    const endOfContentIndex = listItemContent.length;

    const userFullName = listItemContent
      .substring(nameLabelIndex, emailLabelIndex)
      .replace('Name:', '')
      .trim();

    const email = listItemContent
      .substring(emailLabelIndex, avatarLabelIndex)
      .replace('Email:', '')
      .trim();
    expect(userFullName).toEqual(expectedFullName);
    expect(email).toEqual(expectedEmail);

    if (isAvatarPresented) {
      await expect(this.avatar).toBeVisible();
    } else {
      const avatarText: string = listItemContent
        .substring(avatarLabelIndex, endOfContentIndex)
        .replace('Avatar:', '')
        .trim();

      expect(avatarText).toEqual("No Avatar Uploaded");
    }
  }

  async clickBackButton(isForce: boolean = false): Promise<void> {
    await this.backButton.click({force: isForce});
  }
}
