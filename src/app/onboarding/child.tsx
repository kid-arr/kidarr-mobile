import axios, { AxiosResponse } from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { RegisterDeviceResponse } from '@/models/responses/register-device';
import { useAuthContext } from '@/providers/auth-provider';
import { getUniqueDeviceId } from '@/services/unique-device-id';

const Child = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { setAuthState } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log('child', 'Get Permissions');
    const getBarcodePermissions = async () => {
      console.log('child', 'Get Permissions_inner');

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log('child', 'Get Permissions_status', status);
      setHasPermission(status === 'granted');
    };
    getBarcodePermissions();
  }, []);

  const handleScan = async ({ type, data }) => {
    setScanned(true);
    console.log('child', 'handleScan', 'making request', data);
    const url = `${process.env.EXPO_PUBLIC_API_URL}/device/connect`;
    const deviceId = await getUniqueDeviceId();
    console.log('child', 'url', url);
    console.log('child', 'deviceId', deviceId);
    console.log('child', 'childId', data);
    try {
      const response: AxiosResponse<RegisterDeviceResponse> = await axios.post(
        url, //data should be the URL to post to
        { childId: data, deviceId }
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
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const renderProgress = () => {
    return <ActivityIndicator size="large" />;
  };
  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScan}
          style={styles.camera}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan the QR code for your child.</Text>
      {scanned ? renderProgress() : renderCamera()}

      <Button
        title="Spoof It"
        onPress={() => {
          handleScan({
            type: 'qr',
            data: '515e9c4e-7f0b-40eb-9d4f-145af724de0f',
          });
        }}
      />
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
});
