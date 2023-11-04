import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Child = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Child</Text>
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 22,
  },
});
