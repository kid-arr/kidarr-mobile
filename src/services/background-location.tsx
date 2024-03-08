import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import { sendLocationUpdate } from '@/services/utils/location';
const LOCATION_TRACKING = 'location-tracking';
const TRACKING_INTERVAL = 1 * 60 * 1000; // 1 minute
function UserLocation() {
  const [locationStarted, setLocationStarted] = React.useState(true);

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: TRACKING_INTERVAL,
      distanceInterval: 0,
    });
    const hasStarted =
      await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
    setLocationStarted(hasStarted);
    console.log('tracking started?', hasStarted);
  };

  React.useEffect(() => {
    const config = async () => {
      const foregroundResult =
        await Location.requestForegroundPermissionsAsync();
      const backgroundResult =
        await Location.requestBackgroundPermissionsAsync();
      if (
        foregroundResult.status !== 'granted' &&
        backgroundResult.status !== 'granted'
      ) {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };

    config();
  }, []);

  React.useEffect(() => {
    if (locationStarted) {
      startLocationTracking();
    }
  }, [locationStarted]);

  return null;
}

type LocationData = {
  locations: Location.LocationObject[];
};
type TaskInfo = {
  locations: LocationData;
  error: string;
};
TaskManager.defineTask<TaskInfo>(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    const lat = locations[0].coords.latitude;
    const long = locations[0].coords.longitude;

    console.log(
      'Location Update',
      `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
    );
    await sendLocationUpdate();
  }
});

export default UserLocation;
