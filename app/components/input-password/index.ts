import {
  Dialogs,
  FlexboxLayout,
  Screen,
  Label,
  Utils,
  TextField,
  Color,
  Property,
  EventData,
} from "@nativescript/core";
import BaseInput from "../input/common";
const textProperty = new Property<InputPassword, any>({
  name: "text",
  defaultValue: "",
  affectsLayout: true,
});
class InputPassword extends FlexboxLayout {
  private _input: TextField;
  private _label: Label;
  private _passwordVisible;
  constructor() {
    super();
    this._setupView();
  }
  private _configureFlexBox() {
    this.flexDirection = "row";
    this.alignItems = "center";
    this.justifyContent = "space-between";
    this.width = Screen.mainScreen.widthDIPs;
    this.borderWidth = 1;
    this.borderRadius = 9;
  }
  private _configureInput() {
    this._input.secure = true;
    this._input.flexGrow = 1;
    this._input.padding = 10;
    this._input.borderWidth = 0;
    this._input.hint = "Type Your Password";
    this._input.margin = 0;
  }
  private _setupView() {
    this._configureFlexBox();
    this._input = new TextField();
    this._configureInput();
    this._input.on("textChange", (args: EventData) => {
      const newValue = this._input.text;
      this.notifyPropertyChange("text", newValue);
      this.notify({
        eventName: "textChange",
        object: this,
        value: newValue,
      });
    });

    this._label = new Label();
    this._configureLabel();
    this.addChild(this._input);
    this.addChild(this._label);
  }
  private _configureLabel() {
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

  [textProperty.setNative](value: string) {
    this._input.text = value;
  }

  get text() {
    return this._input.text;
  }

  set text(value: any) {
    this._input.text = value;
  }

  set hint(v: string) {
    this._input.hint = v;
  }
  get hint() {
    return this._input.hint;
  }
}
export default InputPassword;

textProperty.register(InputPassword);
