import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create();
api.interceptors.request.use(
  async (config) => {
    const { deviceId, apiKey } = JSON.parse(
      await SecureStore.getItemAsync('child')
    );
    config.headers['x-api-key'] = apiKey;
    config.headers['x-device-id'] = deviceId;
    config.headers.Authorization = `Bearer ${apiKey}`;
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      // do something
    }
    return Promise.reject(error);
  }
);
export default api;
