import { Observable } from "@nativescript/core";
import { BarcodeResult } from "@nativescript/mlkit-barcode-scanning";
import {
  DetectionEvent,
  DetectionType,
  MLKitView,
} from "@nativescript/mlkit-core";
import { getArgsContext, getModelContext } from "~/utils/application";

export class BarcodeAttendanceModel extends Observable {
  public barcode = "";
  private _camera: MLKitView;
  constructor() {
    super();
  }
  public onLoaded(argss) {
    const args = getArgsContext<MLKitView>(argss);
    this._camera = args;
    this._camera.torchOn = false;
  }
  public toggleCam() {
    this._camera.toggleCamera();
  }
  /**
   * torchToggle
   */
  public torchToggle() {
    this._camera.torchOn = !this._camera.torchOn;
  }
  public onDetection(event: DetectionEvent) {
    if (event.type === DetectionType.Barcode) {
      const barcodeData = event.data[0] as BarcodeResult;
      console.log("bounds", barcodeData?.bounds, barcodeData?.rawValue);
      this.set("barcode", barcodeData?.rawValue);
    }
  }
}
