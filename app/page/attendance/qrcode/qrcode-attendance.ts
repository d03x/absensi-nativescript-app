import { Dialogs } from "@nativescript/core";
import { NavigationData } from "@nativescript/core/ui/frame";
import { BarcodeAttendanceModel } from "~/models/qrcode-attendance.model";
import { getArgsContext } from "~/utils/application";
import { ScheduleNotification } from "~/utils/notifications";
/**
 *
 * @param args NavigationData
 */
export function navigatingTo(args: NavigationData) {
  const page = getArgsContext(args);
  page.actionBarHidden = false;
  page.actionBar.title = "QRCODE";
  page.actionBar.flat = true;
  const model = new BarcodeAttendanceModel();
  page.bindingContext = model;
  model.on("propertyChange", (data: any) => {
    if (data.propertyName === "qrcode-data") {
      Dialogs.alert(data?.value);
      ScheduleNotification([
        {
          id: 10,
          body: data.value,
        },
      ]);
    }
  });
}
