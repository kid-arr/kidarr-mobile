import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="onboard"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default OnboardingLayout;
