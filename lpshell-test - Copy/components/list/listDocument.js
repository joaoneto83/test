import React, { useState, useEffect,useRef,useCallback } from 'react';
import { View, Text,Linking,TouchableOpacity,Alert, Image } from "react-native";

import AsyncStorage from '@react-native-community/async-storage'
import styles from './list-styles';

import ShowPdf from '../../assets/download-off-line/showPdf';

function ListDocument(props) {
    const [item, getitem] = useState("");
    
   const [value, callbackButton] = useState("");
   const getUrl = useRef("http://192.168.248.20:6090")

   useEffect(() => {
    console.log("list", props)

   }, [props]
   )

   const getIcon = (extension) => { 
    switch(extension){
        case  ".pdf":
            iconfileName = require('../../assets/images/pdf_Imagem.png')
            break;
        default:
            iconfileName =  require('../../assets/images/document_img.png')

    }
       return iconfileName
   }

   const handlePress = useCallback(  async (item) => {
       
    if (props?.offline) {
            
        const uri = await AsyncStorage.getItem(item.id).then((response) => {return response.replace(/"/g, '')})
          console.log("test cache", uri)
         ShowPdf(uri)
    }else {
        const tokken =   await AsyncStorage.getItem('DATA_KEY').then((response) => { return response.replace(/"/g, '') })
        const supported = await Linking.canOpenURL(getUrl.current + item.filePath + "?access_token=" + tokken );
    
         if (supported) {
           await Linking.openURL(getUrl.current + item.filePath + "?access_token=" + tokken);
          console.log(`Don't know how to open this URL: ${item.filePath }`);
         } else {
           Alert.alert(`Don't know how to open this URL: ${getUrl.current + item.filePath + "?access_token=" + tokken}`);
         }
    }



  }, [item]);

      return (
             <View >
           { props?.list?.map((item)=> (
            <TouchableOpacity style={styles.listDocument} onPress={ () => handlePress(item)}>
            <Image resizeMode="contain" style={styles.imageDocument}
            source={getIcon(item.extension)}/>
              <Text style={[styles.arancia, styles.fonts]} >  ---    </Text>
              <Text style={[styles.fonts]}>{item.fileName}</Text>
              <Text style={[styles.fonts]}>{item.extension}</Text>
              </TouchableOpacity>
            ))
            } 
            </View >
      );
  };

  export default ListDocument;