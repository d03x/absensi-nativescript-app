import {
  LocalNotifications,
  ScheduleOptions,
} from "@nativescript/local-notifications";

const ScheduleNotification = async (options: ScheduleOptions[]) => {
  try {
    const hasPermission = LocalNotifications.hasPermission();
    if (!hasPermission) {
      const permission = await LocalNotifications.requestPermission();
      if (!permission) {
        throw new Error("Permission not granted");
      }
    }

    const option = options.map((ee) => {
      return {
        ...ee,
      };
    });

    LocalNotifications.schedule(option);
  } catch (error) {
    console.log(error);
  }
};
export { ScheduleNotification };
