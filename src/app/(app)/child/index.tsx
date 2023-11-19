import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatBox from '@/components/chat/chat-box';
import QuickMessages from '@/components/quick-messages';
import SosButton from '@/components/sos-button';
import Colours from '@/constants/colours';
import UserLocation from '@/services/background-location';

const ChildHomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sosButton}>
        <SosButton />
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
    top: 50,
    backgroundColor: Colours.lightGrey,
    paddingHorizontal: 20,
  },
  sosButton: {},
});
export default ChildHomePage;
