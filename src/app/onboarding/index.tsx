import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/button';
import Heading from '@/components/heading';

const image = require('../../../assets/images/onboarding.png');

const Onboarding = () => {
  const router = useRouter();
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView className="container h-full bg-white px-7">
        <Heading content="Kidarr" />
        <Text className="text-sm tracking-tight opacity-60 text-textDark">
          Radarr for your kids
        </Text>

        <View className="flex flex-col justify-between space-y-8">
          <Button title="parent" />
          <Button
            title="child"
            color="secondary"
            onPress={async () => {
              router.push('/onboarding/child');
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
    // <Block flex style={styles.container}>
    //   <Block flex center>
    //     <ImageBackground
    //       source={Images.onboarding}
    //       style={{ height, width, zIndex: 1 }}
    //     />
    //   </Block>

    //   <Block flex space="between" style={styles.padded}>
    //     <Block flex space="around" style={{ zIndex: 2 }}>
    //       <Block style={styles.title}>
    //         <Block>
    //           <Text color="white" size={60}>
    //             Parentgrine
    //           </Text>
    //         </Block>
    //         <Block style={styles.subTitle}>
    //           <Text color="white" size={16}>
    //             Keeping a sharp eye on your loved ones.
    //           </Text>
    //         </Block>
    //       </Block>
    //       <Block center>
    //         <Button
    //           style={styles.button}
    //           color={argonTheme.COLORS.BUTTON_COLOR}
    //           textStyle={{ color: argonTheme.COLORS.GREY }}
    //           onPress={async () => {
    //             await SecureStore.setItemAsync('onbst', 'parent');
    //             setAuthState('parent');
    //           }}
    //         >
    //           I am a parent
    //         </Button>
    //         <Button
    //           style={styles.button}
    //           color={argonTheme.COLORS.SECONDARY}
    //           textStyle={{ color: argonTheme.COLORS.BLACK }}
    //           onPress={async () => {
    //             router.push('/onboarding/child');
    //           }}
    //         >
    //           I am a child
    //         </Button>
    //       </Block>
    //     </Block>
    //   </Block>
    // </Block>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Onboarding;
