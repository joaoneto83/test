import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Head from '../Head';


import styles from "../scan/styles";

// ETES*100891*0001*sbeext*localhost

 function CameraS(props) {
    
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  useEffect(() => {

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log("scan",props)
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {

    if (data){
      setScanned(true);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (props?.route?.params?.screem ){
      props.navigation.navigate('InfoAssetControllo', { value: data, screem: props?.route?.params?.screem } )
    } else {
      props.navigation.navigate('InfoAssetDetail', { value: data } )

      //alert()
    }
    }else {
      setScanned(false);
      props.navigation.navigate('InfoAsset')
      console.log("it not ok",type, data)
    }
  
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // onPress = {()=> setScanned(false)} 
  home = () => {
    navigation.navigate('Home')
 
  };
  infoAsset = () => {
    navigation.navigate('InfoAsset')
  }

  return (
    <View style={styles.container}>
         <View style={styles.containerScan}>
         <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
         </View>
     
    </View>
  );
}

export default CameraS;