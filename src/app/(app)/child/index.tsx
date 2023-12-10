import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatBox from '@/components/chat/chat-box';
import QuickMessages from '@/components/quick-messages';
import SosButton from '@/components/sos-button';
import Colours from '@/constants/colours';
import UserLocation from '@/services/background-location';
import PingButton from '@/components/ping-button';

const ChildHomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sosButton}>
        <SosButton />
      </View>
      <View style={styles.sosButton}>
        <PingButton />
      </View>
      <QuickMessages />
      <View style={{ paddingTop: 10 }} />
      <ChatBox />
      <UserLocation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 25,
    backgroundColor: Colours.lightGrey,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  sosButton: {},
});
export default ChildHomePage;
