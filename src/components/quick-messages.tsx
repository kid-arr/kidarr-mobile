import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const values = [
  { id: 'home', label: 'At home' },
  { id: 'school', label: 'At school' },
  { id: 'callme', label: 'Call me' },
  { id: 'okay', label: 'All good' },
  { id: 'homesoon', label: 'Home soon' },
];

const QuickMessages = () => {
  return (
    <Text>Hello Sailor</Text>
    // <Card>
    //   <Card.Title>Quick message</Card.Title>
    //   <Card.Divider />
    //   <View style={styles.messageContainer}>
    //     {values.map((value) => (
    //       <View style={styles.buttonWrapper} key={value.id}>
    //         <Button
    //           onPress={() => sendQuickMessage(value.label)}
    //           radius="lg"
    //           type="outline"
    //           title={value.label}
    //         />
    //       </View>
    //     ))}
    //     <Button onPress={() => alert('TODO')} radius="lg" type="outline">
    //       <Ionicons name="add-outline" size={24} color="black" />
    //     </Button>
    //   </View>
    // </Card>
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
