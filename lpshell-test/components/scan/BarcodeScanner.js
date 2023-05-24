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
    if (props?.route?.params?.title == "Missioni"){
      offline()
    }

    getBarCodeScannerPermissions();
  }, []);
  
  const offline = async ()=>{
    setprocedureAssets(await AsyncStorage.getItem(props.route.params?.mission).then((response) => { return JSON.parse(response) }))

  }
  


  const setQrCodeRadix = (QrCodeRadix, arrayItem )=> {

    props.route.params?.listQrCodeRadix ? listQrCodeRadix.push(props.route.params?.listQrCodeRadix) : undefined

    listQrCodeRadix.toString().split(",").filter( x => x != QrCodeRadix ) ? listQrCodeRadix.push(QrCodeRadix):undefined
    
    listQrCodeRadix.toString().split(",")?.length ==  arrayItem?.length ? getrelease(true) : getrelease(false);
   
    let listBase = arrayItem.map((x)=>{
    
      return  x.qrCodeRadix
       
    }
    ) 
    console.log("listBase",listBase.sort(),listQrCodeRadix.toString().split(",").sort(),  checkArrays( listQrCodeRadix.toString().split(",").sort(),listBase.sort()))
   

  }

   checkArrays = (a1, a2) => {
    return JSON.stringify(a1) === JSON.stringify(a2);
}

 



  const handleBarCodeScanned = ({ type, data }) => {

    console.log("unss", props?.route?.params,data)

    const arrayData = data.replace(/%/g, '').split("*")


     if (props?.route?.params?.title == "Info Asset"){
      
      setOkQR(true) 
      console.log("Info Asset2",okQR)
     }

   if (dataOff?.procedureAssets){
    console.log("3")
    dataOff.procedureAssets.map((item)=> {  
      if (arrayData[1] == "LP" && arrayData[2] == item?.asset?.id){
        setOkQR(true) 
        setcontrollo(item)
        getAsset(item?.asset?.id)
        setqrcodeValue(item?.asset?.qrCodes?.length)
        setQrCodeRadix(arrayData[0].toUpperCase(),item.asset.qrCodes)
        getqrCodeRadix(arrayData[0].toUpperCase())
        
   
        }else if (arrayData[0] == "IDRA" && arrayData[1] == item.asset.keyNum ){
          console.log("IDRA",item?.asset?.qrCodes?.length)
          setcontrollo(item)
          getqrCodeRadix(arrayData[0].toUpperCase())
          setOkQR(true) 
          setqrcodeValue(item?.asset?.qrCodes?.length)
          setQrCodeRadix(arrayData[0].toUpperCase(),item.asset.qrCodes)
       }
         else if (arrayData[0] != "IDRA"  && arrayData[1] == item.asset.register){
          console.log("!IDRA",item?.asset?.qrCodes?.length)
          getqrCodeRadix(arrayData[0].toUpperCase())
          setcontrollo(item)
          setOkQR(true) 
          setqrcodeValue(item.asset.qrCodes?.length - qrcodeControllo)
          setQrCodeRadix(arrayData[0].toUpperCase(),item.asset.qrCodes)
        }

    })
  }
    if (!okQR){
      setTime(time++)
      if (time > 5){
        setTime(0)
      setTimeout(()=>{
        alert("Codice QR errato")
      }, 0)
     }
      return undefined
    }
    
    if (props?.route?.params?.title == "Missioni" && qrCodeRadix == props.route.params?.qrCodeRadix){
      setTime(time++)
      if (time > 5){
        setTime(0)
      setTimeout(()=>{
        alert("Questo codice QR è già stato letto")
      }, 0)
     }
      return undefined
    }
     
    if (props?.route?.params?.title == "Missioni" && props.route.params?.assetCodeId != null && assetCodeId != props.route.params?.assetCodeId ){
      setTime(time++)
      if (time > 5){
        setTime(0)
      setTimeout(()=>{
        alert("Il codice QRcode letto non è compatibile con il QR scansionato in precedenza")
      }, 0)
     }
      return undefined
    }
 
  
    

    if (data){
      console.log("0")
      setScanned(true);
    
      switch (props?.route?.params?.title) {
  
        case "Info Asset":
          if (props?.route?.params.screem ){
            console.log("1")
            props.navigation.navigate('InfoAssetControllo', { value: data, screem: props?.route?.params?.screem } )
          } else {
            console.log("2")
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
      {props?.route?.params?.title == "Info Asset" ?
   <Head prop = {props} routes ={props?.route?.params?.routes} title ={props?.route?.params?.title} screem= {props?.route?.params?.screem} />:
   <Head prop = {props} routes ={props?.route?.params?.routes} id ={props?.route?.params?.mission?.id || props?.route?.params?.mission} title ={props?.route?.params?.title} offline= {props?.route?.params?.offline} screem= {props?.route?.params?.screem} />
      }
    
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