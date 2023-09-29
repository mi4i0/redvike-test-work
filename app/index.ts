import { SignUp } from './pages/signUp.page';
import { PageHolder } from './abstractClass';
import { SuccessSignUp } from './pages/successSignUp.page';

export class Application extends PageHolder {
  public signUp: SignUp = new SignUp(this.page);
  public successSignUp: SuccessSignUp = new SuccessSignUp(this.page);
}

