import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  description: {
    padding: 10,
    fontSize: 16,
  },
});

export default Card;
