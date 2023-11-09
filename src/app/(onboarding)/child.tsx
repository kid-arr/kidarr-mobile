import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";

const Child = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    console.log("child", "Get Permissions");
    const getBarcodePermissions = async () => {
      console.log("child", "Get Permissions_inner");

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log("child", "Get Permissions_statuus", status);
      setHasPermission(status === "granted");
    };
    getBarcodePermissions();
  }, []);

  const handleScan = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  //return a react native text component with the appropriate message
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Please scan the QR code for your child's account
      </Text>
      <Camera type={type}>
        <View>
          <TouchableOpacity>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {/* <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleScan} /> */}
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barcodeContainer: {},
  headerText: {
    fontSize: 22,
  },
});
