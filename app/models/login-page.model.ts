import { Observable } from "@nativescript/core";
//ini adalah bagian dari model
export class LoginPageModel extends Observable {
  private _email: string;
  private _password: string = "WADUK";

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
