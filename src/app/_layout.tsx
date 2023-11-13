import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';

import { AuthProvider } from '@/providers/auth-provider';

const DefaultLayout = () => {
  const router = useRouter();
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'Farts',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerTitle: 'Create Account',
            headerRight: () => (
              <Button title="Open" onPress={() => router.push('modal')} />
            ),
          }}
        />

        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/user" options={{ headerShown: true }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </AuthProvider>
  );
};

export default DefaultLayout;
