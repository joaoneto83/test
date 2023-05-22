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
  let [qrcodeValue, setqrcodeValue] = useState(1);
  let [qrcodeControllo, getqrcodeControllo] = useState(0);
  let [qrCodeRadix, getqrCodeRadix]= useState();
  let [assetCodeId, getAsset] = useState(null);
  let [release, getrelease] = useState(false);

  const listQrCodeRadix = [];




  useEffect(() => {

    const getBarCodeScannerPermissions = async () => {
      console.log("ok", props)
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

  offline()
    getBarCodeScannerPermissions();
  }, []);
  
  const offline = async ()=>{
    setprocedureAssets(await AsyncStorage.getItem(props.route.params?.mission).then((response) => { return JSON.parse(response) }))

  }
  
  const setQrCodeRadix = (QrCodeRadix, arrayItem )=> {

    props.route.params?.listQrCodeRadix ? listQrCodeRadix.push(props.route.params?.listQrCodeRadix) : undefined

    listQrCodeRadix.toString().split(",").filter( x => x != QrCodeRadix ) ? listQrCodeRadix.push(QrCodeRadix):undefined
    
    listQrCodeRadix.toString().split(",")?.length ==  arrayItem?.length ? getrelease(true) : getrelease(false);
  }

   checkArrays = (a1, a2) => {
    return JSON.stringify(a1) === JSON.stringify(a2);
}

 


  const handleBarCodeScanned = ({ type, data }) => {
    console.log("unss", props?.route?.params)
    const arrayData = data.replace(/%/g, '').split("*")


   
    dataOff.procedureAssets.map((item)=> {  
      if (arrayData[1] == "LP" && arrayData[2] == item.asset.id){
        setOkQR(true) 
        setcontrollo(item)
        getAsset(item.asset.id)
        setqrcodeValue(item.asset.qrCodes?.length)
        setQrCodeRadix(arrayData[0].toUpperCase(),item.asset.qrCodes)
        getqrCodeRadix(arrayData[0].toUpperCase())
        
   
        }else if (arrayData[0] == "IDRA" && arrayData[1] == item.asset.keyNum ){
          console.log("IDRA",item.asset.qrCodes?.length)
          setcontrollo(item)
          getqrCodeRadix(arrayData[0].toUpperCase())
          setOkQR(true) 
          setqrcodeValue(item.asset.qrCodes?.length)
          setQrCodeRadix(arrayData[0].toUpperCase(),item.asset.qrCodes)
       }
         else if (arrayData[0] != "IDRA"  && arrayData[1] == item.asset.register){
          console.log("!IDRA",item.asset.qrCodes?.length)
          getqrCodeRadix(arrayData[0].toUpperCase())
          setcontrollo(item)
          setOkQR(true) 
          setqrcodeValue(item.asset.qrCodes?.length - qrcodeControllo)
          setQrCodeRadix(arrayData[0].toUpperCase(),item.asset.qrCodes)
        }

    })
   
    if (!okQR){
      setTime(time++)
      if (time > 5){
        setTime(0)
      setTimeout(()=>{
        alert("errore QRcode")
      }, 0)
     }
      return undefined
    }
    if (qrCodeRadix == props.route.params?.qrCodeRadix && assetCodeId == props.route.params?.assetCodeId){
      setTime(time++)
      if (time > 5){
        setTime(0)
      setTimeout(()=>{
        alert("stesso Qrcode")
      }, 0)
     }
      return undefined
    }
     
    if (props.route.params?.assetCodeId != null && assetCodeId != props.route.params?.assetCodeId ){
      setTime(time++)
      if (time > 5){
        setTime(0)
      setTimeout(()=>{
        alert("Il codice QRcode non appartiene a" + " "+ qrCodeRadix )
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
          if (release){
            props.navigation.navigate('MissioniControllo', { mission: props.route.params?.mission, screem: props?.route?.params?.screem,  procedureAssets: controllo?.procedureAssets, data: controllo , procedureId: controllo.procedure?.id, assetId: controllo.asset?.id, offline: true,  documents: props?.route?.params?.documents} )
          }else if (qrcodeValue >= 2){

            props.navigation.navigate('QrcideMissioni', { mission: props.route.params?.mission, screem: props?.route?.params?.screem, assetCodeId: assetCodeId, qrcodeValue: qrcodeValue, qrCodeRadix: qrCodeRadix, listQrCodeRadix: listQrCodeRadix.toString(), documents: props?.route?.params?.documents } )
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
       <Head prop = {props} routes ={props?.route?.params?.routes} id ={props?.route?.params?.mission.id || props?.route?.params?.mission} title ={props?.route?.params?.title} offline= {props?.route?.params?.offline} screem= {props?.route?.params?.screem} />
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