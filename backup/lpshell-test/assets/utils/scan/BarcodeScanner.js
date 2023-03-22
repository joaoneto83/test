import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Head from '../Head';


import styles from "./styles";

// ETES*100891*0001*sbeext*localhost

 function Scanner(props) {
    
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
      props.navigation.navigate('InfoAssetControllo', { value: data } )
      console.log("ok controllo",type, data)
    }else {
      props.navigation.navigate('InfoAssetDetail', { value: data } )
      console.log("ok",type, data)
    }
  
    }else {
      setScanned(false);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
       <Head  prop = {props} routes ="InfoAsset" title ="Info Asset" screem= {props?.route?.params?.screem} ></Head>
         <View style={styles.containerScan}>
         <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
         </View>
     
    </View>
  );
}

export default Scanner;