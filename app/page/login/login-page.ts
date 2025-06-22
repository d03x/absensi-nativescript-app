import {
  Button,
  EventData,
  Page,
  Utils,
} from "@nativescript/core";
import { NavigationData } from "@nativescript/core/ui/frame";
import { LoginPageModel } from "~/models/login-page.model";
import { getArgsContext, getModelContext } from "~/utils/application";
import MakeToast from "~/utils/toast";
export const onNavigatingTo = (args: NavigationData) => {
  const page = <Page>args.object;
  page.bindingContext = new LoginPageModel();
};

export const dismishKeyboard = (args: EventData) => {
  Utils.dismissKeyboard();
};

export const doLogin = async (args: EventData) => {
  const button = getArgsContext<Button>(args);
  button.text = "Loading...";
  const context = getModelContext<LoginPageModel>(button);
  // button.page.frame.navigate({
  //   moduleName: AppPage.attendance,
  //   transition: {
  //     name: "slideLeft",
  //   },
  // });
    MakeToast("Login berhasil silahkan login","short");

};
