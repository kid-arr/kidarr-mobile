import axios, { AxiosResponse } from 'axios';
import { CameraView, Camera } from 'expo-camera/next';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { DebugConstants } from '@/constants/debug';
import { RegisterDeviceResponse } from '@/models/responses/register-device';
import { useAuthContext } from '@/providers/auth-provider';
import { getUniqueDeviceId } from '@/services/unique-device-id';

const Child = () => {
  const [isEmulator, setIsEmulator] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { setAuthState } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log('child', 'Get Permissions');
    const getBarcodePermissions = async () => {
      console.log('child', 'Get Permissions_inner');

      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('child', 'Get Permissions_status', status);
      setHasPermission(status === 'granted');
    };
    if (!Device.isDevice) {
      console.log('child', 'I am an emulator');
      setIsEmulator(true);
      setHasPermission(false);
    } else {
      console.log('child', 'I am not an emulator');
      getBarcodePermissions();
    }
  }, []);

  const handleScan = async ({ type, data }) => {
    setScanned(true);
    console.log('child', 'handleScan', 'making request', data);
    const url = `${process.env.EXPO_PUBLIC_API_URL}/device/connect`;
    const deviceId =
      type === 'hack' ? DebugConstants.deviceId : await getUniqueDeviceId();
    if (type === 'hack') {
      await SecureStore.setItemAsync(
        'child',
        JSON.stringify({
          childId: DebugConstants.childId,
          deviceId: DebugConstants.deviceId,
          pin: DebugConstants.devicePIN,
          apiKey: DebugConstants.apiKey,
        })
      );
      setAuthState('child');
      router.replace('/');
      return;
    }
    try {
      const deviceName = Device.deviceName;
      const response: AxiosResponse<RegisterDeviceResponse> = await axios.post(
        url, //data should be the URL to post to
        { childId: data, deviceId, deviceName }
      );
      if (response.status === StatusCodes.CREATED) {
        console.log('child', 'handleScan', response.data);
        await SecureStore.setItemAsync('child', JSON.stringify(response.data));
        setAuthState('child');
        router.replace('/');
      } else {
        console.log(
          'child',
          'Error registering devive',
          response.status,
          response.statusText
        );
        alert('Something went wrong, please try again');
        setAuthState('none');
        setScanned(false);
      }
    } catch (err) {
      console.log('child', 'Error registering devive', err);
      alert('Something went wrong, please try again');
      setAuthState('none');
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission && !isEmulator === false) {
    return <Text>No access to camera</Text>;
  }
  const renderProgress = () => {
    return <ActivityIndicator size="large" />;
  };
  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleScan}
          style={styles.camera}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {!isEmulator && (
        <>
          <Text style={styles.title}>Scan the QR code for your child.</Text>
          {scanned ? renderProgress() : renderCamera()}
        </>
      )}
      <TextInput style={styles.PINInput} />
      <View style={styles.buttonContainer}>
        <Button
          title="Spoof It (POST)"
          onPress={() => {
            handleScan({
              type: 'spoof',
              data: DebugConstants.childId,
            });
          }}
        />
        <Button
          title="Hack It (no POST)"
          onPress={() => {
            handleScan({
              type: 'hack',
              data: DebugConstants.childId,
            });
          }}
        />
      </View>
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    rowGap: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  PINInput: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
