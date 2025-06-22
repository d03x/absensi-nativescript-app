import { Button, Image, Observable } from "@nativescript/core";
import { BarcodeResult, Bounds } from "@nativescript/mlkit-barcode-scanning";
import {
  DetectionEvent,
  DetectionType,
  MLKitView,
} from "@nativescript/mlkit-core";

import { getArgsContext } from "~/utils/application";
import { AppImageIcon } from "~/utils/icon";
export class BarcodeAttendanceModel extends Observable {
  public barcode = "";
  private _camera: MLKitView;
  get camera(): MLKitView {
    return this._camera;
  }
  constructor() {
    super();
  }
  /**
   * 
   * @param argss 
   */
  public onLoaded(argss) {
    const args = getArgsContext<MLKitView>(argss);
    this._camera = args;
    this._camera.torchOn = false;
    this._camera.pause = true;
  }
  /**
   * 
   * @param args 
   */
  public start(args) {
    const image = getArgsContext<Image>(args);
    if (this._camera.pause) {
      this._playCamera();
    } else {
      this._stopCamera();
    }
    if (!this.camera.pause) {
      image.src = AppImageIcon.video_pause;
    } else {
      image.src = AppImageIcon.video_play;
    }
  }
  /**
   * torchToggle
   */
  public torchToggle(args) {
    const image = getArgsContext<Image>(args);
    this._camera.torchOn = !this._camera.torchOn;
    if (this._camera.torchOn) {
      image.src = AppImageIcon.flash_off;
    } else {
      image.src = AppImageIcon.flash_on;
    }
  }
  private _stopCamera() {
    this._camera.pause = true;
  }
  private _playCamera() {
    this._camera.pause = false;
  }
  private _getQrCodeValue(data: BarcodeResult): {
    bounds: Bounds;
    value: string;
  } {
    return {
      bounds: data?.bounds,
      value: data?.rawValue,
    };
  }

  public onDetection(event: DetectionEvent) {
    if (event.type === DetectionType.Barcode) {
      const qrcode = this._getQrCodeValue(event.data[0]);
      const qrcodeData = qrcode.value;
      if (qrcodeData) {
        this.set("barcode", qrcodeData);
        this.notifyPropertyChange("qrcode-data", this.barcode);
        this._stopCamera();
      }
    }
  }
}
