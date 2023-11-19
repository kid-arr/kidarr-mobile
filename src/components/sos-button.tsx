import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button, Icon } from '@rneui/base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SosButton = () => {
  return (
    <Button color="error" radius="md" type="solid">
      <MaterialIcons
        name="dangerous"
        size={28}
        color="white"
        style={styles.button}
      />
      SOS SOS SOS
    </Button>
  );
};

export default SosButton;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});
