import { Color, Label } from "@nativescript/core";
import BaseInput from "../input/common";

class InputPassword extends BaseInput {
  protected _passwordVisible;
  constructor() {
    super();
    if (this._input) {
      this._input.secure = true;
    }
    this._label = new Label();
    this._configurePasswordToggle();
    this.addChild(this._label);
  }
  private _configurePasswordToggle() {
    this._label.text = "Show";
    this._label.color = new Color("#007AFF");
    this._label.paddingRight = 5;
    this._label.on("tap", this._togglePasswordVisibility.bind(this));
  }
  private _togglePasswordVisibility() {
    this._passwordVisible = !this._passwordVisible;
    this._input.secure = !this._passwordVisible;
    this._label.text = this._passwordVisible ? "Hide" : "Show";
    this._input.focus();
  }
}
export default InputPassword;
