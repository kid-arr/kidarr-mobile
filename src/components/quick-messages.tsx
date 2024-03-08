import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './button';

const values = [
  { id: 'home', label: 'At home' },
  { id: 'school', label: 'At school' },
  { id: 'callme', label: 'Call me' },
  { id: 'okay', label: 'All good' },
  { id: 'homesoon', label: 'Home soon' },
];

const QuickMessages = () => {
  return (
    <View>
      <Text className="pb-1 text-gray-700 text-md">Quick messages</Text>
      <View className="flex flex-row p-2 space-x-2 border-2 rounded-md">
        <View>
          <Button title="Leaving now." />
        </View>
        <View>
          <Button title="Where are you?" colour="danger" />
        </View>
        <View>
          <Button title="I'm here!" colour="success" />
        </View>
      </View>
    </View>
  );
};

export default QuickMessages;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  buttonWrapper: {
    padding: 2,
  },
});
