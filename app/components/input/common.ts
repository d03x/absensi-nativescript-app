import { Color, Property, TextField } from "@nativescript/core";
const roundedProperty = new Property<BaseInput, number>({
  name: "rounded",
  defaultValue: 5,
  affectsLayout: true,
});
class BaseInput extends TextField {
  private rounded = 9;
  constructor() {
    super();
    this.testID = "input";
    this.className = "input";
    this._initializeStyle();
    this._setupEvents();
  }
  private _initializeStyle() {
    this.style.fontSize = 13;
    this.borderWidth = 1;
    this.paddingTop = 8;
    this.borderRadius = this.rounded;
    this.margin = 0;
    this.paddingBottom = 8;
    this.paddingRight = 10;
    this.borderColor = new Color("#CCCCCC");
    this.color = new Color("#333333");
    this.placeholderColor = new Color("#999999");
    this.paddingLeft = 10;
    this.fontWeight = "400";
  }
  [roundedProperty.setNative](value: number) {
    this.rounded = value;
  }
  private _setupEvents() {
    this.on("focus", () => {
      this.borderColor = new Color("#999999");
    });
    this.on("blur", () => {
      this.borderColor = new Color("#CCCCCC");
    });
  }
}
export default BaseInput;

roundedProperty.register(BaseInput);
