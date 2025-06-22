import { Application, Utils } from "@nativescript/core";
type duration = "long" | "short";
export const MakeToast = (text, duration: duration = "short") => {
  if (Application.android) {
    android.widget.Toast.makeText(
      Utils.android.getApplicationContext(),
      text,
      duration === "short"
        ? android.widget.Toast.LENGTH_SHORT
        : android.widget.Toast.LENGTH_LONG
    ).show();
  }
};
export default MakeToast;
