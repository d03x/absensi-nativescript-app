import { Application, Dialogs } from "@nativescript/core";
import { LocalNotifications } from "@nativescript/local-notifications";
import MakeToast from "./utils/toast";
//run application
Application.on("launch", () => {
  console.log("Application  is launching");
  LocalNotifications.requestPermission().then((e) => {
    Dialogs.alert(e);
  });
  LocalNotifications.addOnMessageReceivedCallback(notif=>{
    console.log("id",notif.id);
    
  })
});
Application.run({ moduleName: "app-root" });
