import { Stack } from 'expo-router';
import React from 'react';

import ChildHeader from '@/components/child-header';

const ChildLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <ChildHeader /> }} />
    </Stack>
  );
};

export default ChildLayout;
