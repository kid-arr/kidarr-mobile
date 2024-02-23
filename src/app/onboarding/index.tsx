import { useRouter } from 'expo-router';
import React from 'react';
import { View, ImageBackground } from 'react-native';

import Button from '@/components/button';
import Heading from '@/components/heading';

const image = require('../../../assets/images/onboarding.png');

const Onboarding = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="justify-center flex-1"
      >
        <View className="flex justify-between h-full p-4">
          <View className="p-8">
            <Heading content="Welcome to.." />
          </View>

          <View>
            <Heading content="Kidarr Mobile..." />
          </View>
          <View className="flex flex-col space-y-4">
            <View>
              <Button title="I'm a parent" colour="primary" />
            </View>
            <View>
              <Button
                title="I'm a child"
                colour="secondary"
                onPress={() => {
                  router.push('/onboarding/child');
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Onboarding;
