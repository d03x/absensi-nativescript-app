import { Application,  Utils } from "@nativescript/core";
type Location = {
  altitude: number;
  latitude: number;
  longitude: number;
  speed: number;
  acuracy: number;
};
const getLocation = (options?: {
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

    //checkPermision
    if (
      androidx.core.content.ContextCompat.checkSelfPermission(
        Utils.android.getApplicationContext(),
        android.Manifest.permission.ACCESS_FINE_LOCATION
      ) != android.content.pm.PackageManager.PERMISSION_GRANTED
    ) {
      reject(new Error("Location permission not granted"));
      return;
    }
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
        resolve({
          altitude: location.getAltitude(),
          speed: location.getSpeed(),
          acuracy: location.getAccuracy(),
          latitude: location.getLatitude(),
          longitude: location.getLongitude(),
        });
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
  });
};

export default getLocation;
