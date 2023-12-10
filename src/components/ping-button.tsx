import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from '@rneui/base';
import { AxiosResponse } from 'axios';
import * as Location from 'expo-location';
import React from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';

import api from '@/services/api-service';

const PingPutton = () => {
  const _sendLocationUpdate = async () => {
    const currentLocation = await Location.getCurrentPositionAsync({});
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
      console.log('ping-button', 'response', response);
    } catch (e) {
      console.log('ping-button', 'error', e);
      ToastAndroid.show('Failed to update location!', ToastAndroid.LONG);
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
