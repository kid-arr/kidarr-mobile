import React from 'react';
import { StyleSheet } from 'react-native';

import Button from '@/components/button';
import { sendLocationUpdate } from '@/services/utils/location';

const PingPutton = () => {
  const _sendLocationUpdate = async () => {
    try {
      console.log(
        'ping-button',
        '_sendLocationUpdate',
        'Awaiting current location'
      );
      await sendLocationUpdate();
    } catch (e) {
      console.error('ping-button', '_sendLocationUpdate', e);
    }
  };
  return (
    <Button
      colour="secondary"
      radius="md"
      type="solid"
      title="Send Location Update"
      icon="add-location"
      onPress={_sendLocationUpdate}
    />
  );
};

export default PingPutton;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});
