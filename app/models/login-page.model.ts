import { Observable } from "@nativescript/core";

export class LoginPageModel extends Observable {
  private _email: string;
  private _password: string;

  constructor() {
    super();
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }

  set email(v: string) {
    this._email = v;
  }
  set password(v: string) {
    this._password = v;
  }
}
