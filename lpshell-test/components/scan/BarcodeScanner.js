import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Head from '../Head';
import AsyncStorage from '@react-native-community/async-storage';


import styles from "./styles";

// ETES*100891*0001*sbeext*localhost

 function Scanner(props) {
    
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  let [okQR, setOkQR] = useState(false);
  let [dataOff, setprocedureAssets] =  useState ();
  let [controllo, setcontrollo] =  useState ([]);
  let [time, setTime] =  useState (0);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      console.log("ok", props)
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
if (props?.route?.params?.offline){
  console.log("e",props?.route?.params?.mission )
  offline()
}

    getBarCodeScannerPermissions();
  }, []);
  
  const offline = async ()=>{
    setprocedureAssets(await AsyncStorage.getItem(props.route.params?.mission).then((response) => { return JSON.parse(response) }))

  }
   

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("unss", props?.route?.params)
    const arrayData = data.replace(/%/g, '').split("*")

   if (dataOff){
    dataOff.procedureAssets.map((item)=> {  
      if (arrayData[1] == "Lp" && arrayData[2] == item.asset.id){
        setcontrollo(item)
        setOkQR(true) 
     
        }else if (arrayData[0] == "IDRA" && arrayData[1] == item.asset.keyNum ){
          console.log("IDRA")
          setcontrollo(item)
          setOkQR(true) 
        
       }
         else if (arrayData[0] != "IDRA"  && arrayData[1] == item.asset.register){
          setcontrollo(item)
          setOkQR(true) 
        }

    })
   } 
   if (!props?.route?.params?.offline){
    setOkQR(true) 
   }
   if (!okQR){
    setTime(time++)
   
    console.log(time)
    if (time > 15){
    setTimeout(()=>{
      alert("errore QR code")
    }, 0)
   }
  

    return undefined
  }
   

 
  
    

    if (data){
      setScanned(true);

      switch (props?.route?.params?.title) {
        case "Info Asset":
          if (props?.route?.params?.screem ){
     
            props.navigation.navigate('InfoAssetControllo', { value: data, screem: props?.route?.params?.screem } )
          } else {
            props.navigation.navigate('InfoAssetDetail', { value: data } )
      
           
          }
          break;
        case "Missioni":
         if(dataOff){
          props.navigation.navigate('MissioniControllo', { mission: props.route.params?.mission,  procedureAssets: controllo?.procedureAssets, data: controllo , procedureId: controllo.procedure?.id, assetId: controllo.asset?.id, offline: props?.route?.params?.offline,  documents: props?.route?.params?.documents} )
         }else {
          props.navigation.navigate('MissioniControllo', { mission: props.route.params?.mission, value: data, procedureAssets: props?.route?.params?.procedureAssets, data: props?.route?.params?.data, procedureId: props?.route?.params?.procedureId, assetId: props?.route?.params?.assetId, offline: props?.route?.params?.offline,  documents: props?.route?.params?.documents} )
         }
           
          break;
        default:
        
          undefined
      }

    
    }else {
      setScanned(false);
      props.navigation.navigate('InfoAsset')
     
    }
  
  };

 
  home = () => {
    navigation.navigate('Home')
 
  };
  infoAsset = () => {
    navigation.navigate('InfoAsset')
  }

  return (
    <View style={styles.container}>
       <Head prop = {props} routes ={props?.route?.params?.routes} title ={props?.route?.params?.title} offline= {props?.route?.params?.offline} screem= {props?.route?.params?.screem} />
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