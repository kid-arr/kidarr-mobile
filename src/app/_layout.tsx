import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';

import { AuthProvider, useAuthContext } from '@/providers/auth-provider';

const InitialLayout = () => {
  const { isLoaded, authState } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    setTimeout(() => {
      if (authState === 'child') {
        router.replace('(app)/child');
      } else if (authState === 'parent') {
        router.replace('/user/parent');
      } else {
        router.replace('/onboarding');
      }
    }, 0);
  }, [authState]);

  return <Slot />;
};

const DefaultLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default DefaultLayout;
