import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Block, Button, Text, theme } from 'galio-framework';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';

import { Images } from '@/constants/images';
import argonTheme from '@/constants/theme';
import { useAuthContext } from '@/providers/auth-provider';

const { height, width } = Dimensions.get('screen');

const Onboarding = () => {
  const { setAuthType } = useAuthContext();
  const router = useRouter();
  return (
    <Block flex style={styles.container}>
      <Block flex center>
        <ImageBackground
          source={Images.onboarding}
          style={{ height, width, zIndex: 1 }}
        />
      </Block>

      <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <Block style={styles.title}>
            <Block>
              <Text color="white" size={60}>
                Parentgrine
              </Text>
            </Block>
            <Block style={styles.subTitle}>
              <Text color="white" size={16}>
                Keeping a sharp eye on your loved ones.
              </Text>
            </Block>
          </Block>
          <Block center>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.BUTTON_COLOR}
              textStyle={{ color: argonTheme.COLORS.GREY }}
              onPress={async () => {
                await SecureStore.setItemAsync('onbst', 'parent');
                setAuthType('parent');
              }}
            >
              I am a parent
            </Button>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.SECONDARY}
              textStyle={{ color: argonTheme.COLORS.BLACK }}
              onPress={async () => {
                router.push('/child');
              }}
            >
              I am a child
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS?.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES?.BASE || 2 * 2,
    position: 'relative',
    bottom: theme.SIZES?.BASE || 2,
    zIndex: 2,
  },
  button: {
    width: width - (theme.SIZES?.BASE || 12) * 4,
    height: theme.SIZES?.BUTTON_HEIGHT || 2 * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%',
  },
  title: {
    marginTop: '-5%',
  },
  subTitle: {
    marginTop: 20,
  },
});
export default Onboarding;
