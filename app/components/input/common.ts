import {
  FlexboxLayout,
  Screen,
  Label,
  TextField,
  Color,
  Property,
  EventData,
} from "@nativescript/core";

const textProperty = new Property<BaseInput, any>({
  name: "text",
  defaultValue: "",
  affectsLayout: true,
});
class BaseInput extends FlexboxLayout {
  public static textChangeEvent = "textChange";

  protected _input: TextField;
  protected _label: Label;
  constructor() {
    super();
    this.className = "input-password";
    this._setupView();
  }
  protected _configureFlexBox() {
    this.flexDirection = "row";
    this.alignItems = "center";
    this.justifyContent = "space-between";
    this.width = Screen.mainScreen.widthDIPs;
    this.borderWidth = 1;
    this.borderRadius = 9;
    this.backgroundColor = new Color("#FFFFFF");
    this.borderColor = new Color("#CCCCCC");
    this._input.on("focus", () => {
      this.borderColor = new Color("#999999");
    });
    this._input.on("blur", () => {
      this.borderColor = new Color("#CCCCCC");
    });
  }
  protected _configureInput() {
    this._input.flexGrow = 1;
    this._input.padding = 10;
    this._input.borderWidth = 0;
    this._input.margin = 0;
    /////////// INPUT CHANGE HANDLE /////////////
    this._input.on("textChange", () => {
      const newValue = this._input.text;
      this.notifyPropertyChange("text", newValue);
      this.notify({
        eventName: BaseInput.textChangeEvent,
        object: this,
        value: newValue,
      });
    });
  }
  protected _setupView() {
    ///////////INPUT////////////
    this._input = new TextField();
    this._configureInput();
    this._configureFlexBox();
    this.addChild(this._input);
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

  set hint(value: string) {
    this._input.hint = value;
  }
  get hint() {
    return this._input.hint;
  }
  get input(): TextField {
    return this._input;
  }
}
export default BaseInput;
textProperty.register(BaseInput);
