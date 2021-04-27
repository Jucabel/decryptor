import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addQrInfoToTheList } from '../redux/reducers/qrReducer';
import { connect } from 'react-redux';

const QRReader = ({ addQrInfoToTheList, qrList, nTab }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { state } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(state === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    addQrInfoToTheList({
      type: type,
      data: data,
    });
    alert(`Bar code with type ${type} has been scanned`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container} id='scene1'>
      {nTab === 0 && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      )}
      {!scanned && (
        <Image
          style={styles.square}
          source={{
            uri:
              'data:image/png;base64,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',
          }}
        />
      )}
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
          <Text style={styles.buttonText}>Scan again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  qrList: state.qrReducer.qrList,
  nTab: state.qrReducer.nTab,
});
export default connect(mapStateToProps, { addQrInfoToTheList })(QRReader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(44,19,82,.7)',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  square: {
    width: 350,
    height: 350,
  },
});
