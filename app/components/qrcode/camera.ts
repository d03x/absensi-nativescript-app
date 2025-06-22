import { Dialogs, Property } from "@nativescript/core";
import { DetectionType, MLKitView } from "@nativescript/mlkit-core";
const sizeProperty = new Property<BarcodeScannerCommon, number>({
  name: "size",
  defaultValue: 300,
  affectsLayout: __APPLE__,
});
class BarcodeScannerCommon extends MLKitView {
  constructor() {
    super();
    this.className = "barcode-scanner";
    this._initialize();
  }

  private _initialize() {
    this.detectionType = DetectionType.Barcode;
  }
  [sizeProperty.setNative](value: number) {
    this.width = value;
    this.height = value;
  }
}

export default BarcodeScannerCommon;
sizeProperty.register(BarcodeScannerCommon);
