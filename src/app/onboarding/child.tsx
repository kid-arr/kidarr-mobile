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
      console.log('child', 'Get Permissions_statuus', status);
      setHasPermission(status === 'granted');
    };
    getBarcodePermissions();
  }, []);

  const handleScan = async ({ type, data }) => {
    setScanned(true);
    console.log('child', 'handleScan', 'making request', data);
    const response: AxiosResponse<RegisterDeviceResponse> = await axios.post(
      data,
      { type, data }
    );
    if (response.status === StatusCodes.CREATED) {
      console.log('child', 'handleScan', response.data);
      await SecureStore.setItemAsync('child', JSON.stringify(response.data));
      setAuthState('child');
      router.replace('/');
    }
    setScanned(false);
  };

  //return a react native text component with the appropriate message
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
            data: 'https://parentgrin.dev.fergl.ie:3000/api/device/connect?childId=ffa9a83c-824e-4dce-a034-3ab5556b0a1d',
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
