import { AxiosResponse } from 'axios';
import * as Location from 'expo-location';
import { ToastAndroid } from 'react-native';

import api from '@/services/api-service';

export const getLocationWithRetry = async (
  retries = 2
): Promise<Location.LocationObject> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Timeout exceeded')), 10000)
  );
  try {
    return (await Promise.race([
      Location.getCurrentPositionAsync({}),
      timeout,
    ])) as Location.LocationObject;
  } catch (error) {
    if (retries > 0) {
      return getLocationWithRetry(retries - 1);
    } else {
      throw error;
    }
  }
};

export const sendLocationUpdate = async () => {
  const currentLocation = await getLocationWithRetry();
  console.log(
    'ping-button',
    '_sendLocationUpdate',
    `${new Date(Date.now()).toLocaleString()}: ${
      currentLocation.coords.latitude
    },${currentLocation.coords.longitude}`
  );
  const url = `${process.env.EXPO_PUBLIC_API_URL}/device/ping`;
  try {
    const response: AxiosResponse = await api.post(
      url, //data should be the URL to post to
      {
        coordinates: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
      }
    );
    console.log('ping-button', 'response', response.data);
  } catch (e) {
    console.log('ping-button', 'error', e);
    ToastAndroid.show('Failed to update location!', ToastAndroid.LONG);
  }
};
