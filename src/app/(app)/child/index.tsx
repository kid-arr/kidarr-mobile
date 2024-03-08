import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatBox from '@/components/chat/chat-box';
import PingButton from '@/components/ping-button';
import QuickMessages from '@/components/quick-messages';
import SosButton from '@/components/sos-button';
import Colours from '@/constants/colours';
import UserLocation from '@/services/background-location';

const ChildHomePage = () => {
  return (
    <SafeAreaView className="flex flex-col justify-between mx-2 mt-8">
      <View className="flex space-y-4 ">
        <View className="flex space-y-2">
          <View>
            <SosButton />
          </View>
          <View>
            <PingButton />
          </View>
        </View>
      </View>
      <View className="flex pt-4 space-y-4">
        <View>
          <QuickMessages />
        </View>
        <View>
          <ChatBox />
        </View>
        <View>
          <UserLocation />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChildHomePage;
