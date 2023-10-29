import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuthContext } from "../provders/auth-provider";

const IndexPage = () => {
  const { authState, setAuthState } = useAuthContext();
  return (
    <View style={styles.container}>
      <Text>Auth Context: {authState}</Text>
      <Link href={"/register"}>Open register</Link>

      <Button
        title="Click me"
        onPress={() => {
          setAuthState("parent");
          alert("You clicked me!!!");
        }}
      ></Button>
    </View>
  );
};

export default IndexPage;

const styles = StyleSheet.create({ container: { flex: 1, padding: 8 } });
