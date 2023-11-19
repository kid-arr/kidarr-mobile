import { Unmatched } from 'expo-router';
import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

const UnmatchedPage = () => {
  return (
    <View style={styles.container}>
      <Text>Are you lost??</Text>
      <Unmatched />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Unmatched;
