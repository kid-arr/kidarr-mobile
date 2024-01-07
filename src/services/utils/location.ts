import * as Location from 'expo-location';

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
