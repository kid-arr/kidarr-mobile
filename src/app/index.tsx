import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "galio-framework";
import { Link } from "expo-router";
import { useAuthContext } from "@/providers/auth-provider";
import argonTheme from "@/constants/theme";

const IndexPage = () => {
  const { authState, setAuthState } = useAuthContext();
  return (
    <View style={styles.container}>
      <Text h5>Auth Context: {authState}</Text>
      <Link style={styles.link} href={"/register"}>
        Open register
      </Link>
      <Link style={styles.link} href={"/onboard"}>
        Open onboarding
      </Link>
      <View style={styles.buttonGroup}>
        <Button
          onPress={() => {
            setAuthState("parent");
          }}
        >
          Change Auth State
        </Button>
        <Button
          onPress={() => {
            setAuthState("none");
          }}
        >
          Reset Auth State
        </Button>
      </View>
    </View>
  );
};

export default IndexPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  link: {
    padding: 4,
    marginVertical: 2,
    fontSize: 22,
    color: argonTheme.COLORS.PRIMARY,
    borderColor: argonTheme.COLORS.BORDER,
    borderWidth: 2,
  },
  buttonGroup: {
    justifyContent: "space-around",
    width: "100%",
  },
});
