import { EventData, Page } from "@nativescript/core";

export const getArgsContext = <T = Page>(args): T => {
  return args.object as T;
};

export function getModelContext<T>(page) {
  if (typeof page.object != "undefined") {
    const object = <Page>page.object;
    return <T>object.bindingContext;
  }
  return <T>page.bindingContext;
}
