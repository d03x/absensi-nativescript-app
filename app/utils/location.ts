import { Application, Utils } from "@nativescript/core";
type Location = {
  altitude: number;
  latitude: number;
  longitude: number;
  speed: number;
  acuracy: number;
};
export const isLocationEnabled = () => {
  if (Application.android) {
    const androidContext = Utils.android.getApplicationContext();
    const locationManager = androidContext.getSystemService(
      android.content.Context.LOCATION_SERVICE
    ) as android.location.LocationManager;

    return (
      locationManager.isProviderEnabled(
        android.location.LocationManager.GPS_PROVIDER
      ) ||
      locationManager.isProviderEnabled(
        android.location.LocationManager.NETWORK_PROVIDER
      )
    );
  }
  return false;
};
export const requestLocationPermisions = () => {
  return new Promise((resolve, reject) => {
    if (Application.android) {
      const applicationContext = Utils.android.getApplicationContext();
      const permision = android.Manifest.permission.ACCESS_FINE_LOCATION;
      if (
        androidx.core.content.ContextCompat.checkSelfPermission(
          applicationContext,
          permision
        ) === android.content.pm.PackageManager.PERMISSION_GRANTED
      ) {
        resolve(true);
        return;
      }

      const activity =
        Application.android.foregroundActivity ||
        Application.android.startActivity;

      androidx.core.app.ActivityCompat.requestPermissions(
        activity,
        [permision],
        1001 // request code
      );
      activity.onRequestPermissionsResult = (
        requestCode,
        permisions,
        grantResultss
      ) => {
        if (requestCode === 1001) {
          resolve(
            grantResultss[0] ===
              android.content.pm.PackageManager.PERMISSION_GRANTED
          );
        }
      };
    } else if (Application.ios) {
      resolve(false);
    } else {
      resolve(false);
    }
  });
};
const getLocation = async (options?: {
  provider: "gps" | "network";
  mintime?: number;
  minDistance?: number;
}): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!Application.android) {
      reject(new Error("Android location only available on Android"));
      return;
    }
    const locationManager = Utils.android
      .getApplicationContext()
      .getSystemService(
        android.content.Context.LOCATION_SERVICE
      ) as android.location.LocationManager;

    const provider = options.provider || "gps";
    const minTime = options.mintime || 10000;
    const minDistance = options.minDistance || 10;
    requestLocationPermisions()
      .then(() => {
        const lastKnownLocation = locationManager.getLastKnownLocation(
          provider === "gps"
            ? android.location.LocationManager.GPS_PROVIDER
            : android.location.LocationManager.NETWORK_PROVIDER
        );
        if (lastKnownLocation) {
          resolve({
            altitude: lastKnownLocation.getAltitude(),
            speed: lastKnownLocation.getSpeed(),
            acuracy: lastKnownLocation.getAccuracy(),
            latitude: lastKnownLocation.getLatitude(),
            longitude: lastKnownLocation.getLongitude(),
          });
        }
        const locationListener = new android.location.LocationListener({
          onLocationChanged: (location: any) => {
            locationManager.removeUpdates(locationListener);
            if (location) {
              resolve({
                altitude: location?.getAltitude(),
                speed: location?.getSpeed(),
                acuracy: location?.getAccuracy(),
                latitude: location?.getLatitude(),
                longitude: location?.getLongitude(),
              });
            }
          },
          onFlushComplete: (requestCode: number) => {},
          onStatusChanged: (
            provider: string,
            status: number,
            extras: android.os.Bundle
          ) => {},
          onProviderEnabled: (provider: string) => {},
          onProviderDisabled: (provider: string) => {},
        });
        locationManager.requestLocationUpdates(
          provider === "gps"
            ? android.location.LocationManager.GPS_PROVIDER
            : android.location.LocationManager.NETWORK_PROVIDER,
          minTime,
          minDistance,
          locationListener
        );
      })
      .catch(() => {
        reject(new Error("Location permission not granted"));
      });
  });
};

export default getLocation;
