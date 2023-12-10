import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

export const getUniqueDeviceId = async () => {
  const id = Crypto.randomUUID();
  console.log('unique-device-id', 'getUniqueDeviceId', id);
  await SecureStore.setItemAsync('deviceid', id);
  return id;
};
