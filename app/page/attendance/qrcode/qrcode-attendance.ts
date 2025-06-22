import {
  BiometricAuth,
  BiometricIDAvailableResult,
  BiometricResult,
  ERROR_CODES,
} from "@nativescript/biometrics";
import { Dialogs, EventData, View } from "@nativescript/core";
import { NavigationData } from "@nativescript/core/ui/frame";
import { BarcodeAttendanceModel } from "~/models/qrcode-attendance.model";
import { getArgsContext } from "~/utils/application";
export function navigatingTo(args: NavigationData) {
  const page = getArgsContext(args);
  page.actionBarHidden = false;
  page.actionBar.title = "QRCODE";
  page.actionBar.flat = true;
  const model = new BarcodeAttendanceModel();
  page.bindingContext = model;
  model.on("propertyChange", (data: any) => {
    if (data.propertyName === "barcodeData") {
      Dialogs.alert(data?.value);
    }
  });
}
export function scanLineLoaded(args: EventData) {
  const scanLine = args.object as View;
  scanLine.animate({
    translate: { x: 0, y: 250 },
    duration: 2000,
    iterations: Number.POSITIVE_INFINITY,
  });
}
