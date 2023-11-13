import { Stack } from 'expo-router';
import React from 'react';

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="onboard" options={{ headerShown: false }} />
      <Stack.Screen name="child" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OnboardingLayout;
