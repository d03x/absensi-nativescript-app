import { Frame, Page } from "@nativescript/core";
import { AppPage } from "./page/page";

export const createPage = () => {
  const page = new Page();
  const layout = new Frame();
  page.actionBarHidden = true;
  layout.defaultPage = AppPage.login;
  page.content = layout;
  return page;
};
