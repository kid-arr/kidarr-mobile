import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from '@rneui/base';
import { AxiosResponse } from 'axios';
import React from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';

import api from '@/services/api-service';
import { getLocationWithRetry } from '@/services/utils/location';

const PingPutton = () => {
  const _sendLocationUpdate = async () => {
    try {
      console.log(
        'ping-button',
        '_sendLocationUpdate',
        'Awaiting current location'
      );
      const currentLocation = await getLocationWithRetry();
      console.log(
        'ping-button',
        '_sendLocationUpdate',
        `${new Date(Date.now()).toLocaleString()}: ${
          currentLocation.coords.latitude
        },${currentLocation.coords.longitude}`
      );
      const url = `${process.env.EXPO_PUBLIC_API_URL}/socket/ping`;
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
    } catch (e) {
      console.error('ping-button', '_sendLocationUpdate', e);
    }
  };
  return (
    <Button
      color="primary"
      radius="md"
      type="solid"
      onPress={_sendLocationUpdate}
    >
      <MaterialIcons
        name="dangerous"
        size={28}
        color="white"
        style={styles.button}
      />
      Send Location Update
    </Button>
  );
};

export default PingPutton;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});
