import {
  alert,
  Button,
  Dialogs,
  EventData,
  Http,
  Observable,
  Page,
  Utils,
} from "@nativescript/core";
import { NavigationData } from "@nativescript/core/ui/frame";
import { LoginPageModel } from "~/models/login-page.model";
import { getArgsContext, getModelContext } from "~/utils/application";
import { AppPage } from "../page";

export const onNavigatingTo = (args: NavigationData) => {
  console.log("WECLL");
  const page = <Page>args.object;
  page.bindingContext = new LoginPageModel();
};

export const dismishKeyboard = (args: EventData) => {
  const page = <Page>args.object;
  Utils.dismissKeyboard();
};

export const doLogin = async (args: EventData) => {
  const button = getArgsContext<Button>(args);
  button.text = "Loading...";
  const context = getModelContext<LoginPageModel>(button);
  try {
    await Http.getJSON(
      "https://jsonplaceholder.typicode.com/todos/" + context.email
    ).then((e: any) => {
      Dialogs.alert(e.title);
    });
    button.page.frame.navigate({
      moduleName: AppPage.attendance,
    });
  } catch (error) {
    Dialogs.alert(error.message);
  } finally {
    button.text = "Login";
  }
};
