import { Color } from "@nativescript/core";
import { NavigationData } from "@nativescript/core/ui/frame";
import { BarcodeResult } from "@nativescript/mlkit-barcode-scanning";
import {
  DetectionType,
  DetectionEvent,
  MLKitView,
} from "@nativescript/mlkit-core";
import { BarcodeAttendanceModel } from "~/models/barcode-attendance.model";
import { getArgsContext, getModelContext } from "~/utils/application";
export function navigatingTo(args: NavigationData) {
  const page = getArgsContext(args);
  page.actionBar.title = "::PRESENSI::QRCODE";
  page.actionBar.flat = true;
  page.bindingContext = new BarcodeAttendanceModel();
}
