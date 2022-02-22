export class SignupInfo {
  public email: string;
  public username: string;
  public plaintext_password: string;

  /* istanbul ignore next */
  constructor() {
    this.email = '';
    this.username = '';
    this.plaintext_password = '';
  }
}
