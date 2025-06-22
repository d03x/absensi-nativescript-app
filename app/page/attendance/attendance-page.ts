import * as camera from "@nativescript/camera";
import { Dialogs, Frame, Image, ImageAsset, Page } from "@nativescript/core";
import { NavigationData } from "@nativescript/core/ui/frame";
import * as imagePickerPlugin from "@nativescript/imagepicker";
import { ImagePicker } from "@nativescript/imagepicker";
import { getArgsContext } from "~/utils/application";
import { AppPage } from "../page";

export const onNavigatedTo = async (args: NavigationData) => {
  const page = getArgsContext<Page>(args);
  page.actionBarHidden = true;
  const perms = await camera.requestPermissions();
  if (perms.Success) {
    console.log("Granted");
  }
};

export const bracodePresensi = () => {
  Frame.topmost().navigate({
      moduleName:AppPage.attendance_qrcode,
      transition : {
        name : "slideTop"
      }
  });
};

/**
 * manual capture
 */
export const capture = () => {
  const isAval = camera.isAvailable();
  const image = Frame.topmost().currentPage.getViewById("image") as Image;
  if (isAval) {
    camera
      .takePicture({
        saveToGallery: false,
        width: 200,
        height: 200,
        keepAspectRatio: true,
      })
      .then((imageAsset: ImageAsset) => {
        image.src = imageAsset.android;
        console.log(imageAsset.android);
      });
  }
};
/**
 * for pick image form galery
 */
export const pickImage = () => {
  let imageobj: ImagePicker = imagePickerPlugin.create({
    mediaType: 1,
    mode: "single",
    android: { use_photo_picker: true },
  });
  const image = Frame.topmost().currentPage.getViewById("image") as Image;
  imageobj.authorize().then((res) => {
    if (res.authorized) {
      return imageobj.present().then((sele) => {
        image.src = sele[0].path;
      });
    }
  });
};
