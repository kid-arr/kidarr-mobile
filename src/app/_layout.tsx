import { View, Text, Button } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuthContext } from "../providers/auth-provider";

const DefaultLayout = () => {
  const router = useRouter();
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Farts",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerTitle: "Create Account",
            headerRight: () => (
              <Button title="Open" onPress={() => router.push("modal")} />
            ),
          }}
        />

        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="child" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AuthProvider>
  );
};

export default DefaultLayout;
