import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuthContext } from "../providers/auth-provider";

const IndexPage = () => {
  const { authState, setAuthState } = useAuthContext();
  return (
    <View style={styles.container}>
      <Text>Auth Context: {authState}</Text>
      <Link href={"/register"}>Open register</Link>
      <Link href={"/onboard"}>Open onboarding</Link>
      <View style={styles.buttonGroup}>
        <Button
          title="Click me"
          onPress={() => {
            setAuthState("parent");
          }}
        ></Button>
        <Button
          title="Reset"
          onPress={() => {
            setAuthState("none");
          }}
        ></Button>
      </View>
    </View>
  );
};

export default IndexPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  buttonGroup: {
    padding: 12,
    margin: 4,
    justifyContent: "space-around",
  },
});
