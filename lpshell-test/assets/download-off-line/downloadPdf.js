import { View, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import AsyncStorage from '@react-native-community/async-storage'
import React, { useState, useEffect } from 'react';

import { requestPermissionsAsync, MediaLibrary} from 'expo-media-library';

import ShowPdf from './showPdf';


export default function DownloadPdf (props){
    const [show, getShow] = useState(false);
    const [url, getUrl] = useState("");
//    useEffect(() => {
//     console.log("radio",onoff,props.values )
//     props.callbackButtonRadio(value = {value :onoff, id:props.id})
//    }, [onoff]
//    )
 
     saveFile = async (keyName,url,fileName) => {

 
        let te=[]

            FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
            .then( async ({uri}) => {
                 
        
           AsyncStorage.setItem(keyName, JSON.stringify( uri ) );

          te = await AsyncStorage.getItem(keyName).then((response) => {return response})
           alert("cache", te,keyName);
           getUrl(uri)
           getShow(true)
        
           console.log("ok",  te, show, url)
           
                // try {
                //     const cUri = await FileSystem.getContentUriAsync(uri);
                //     await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                //         data: cUri,
                //         flags: 1,
                //         type: "application/pdf",
                //     });
                  
                //   }catch(e){
                //     alert("erro",uri);
                //       console.log(e.message);
                //   }
            }).catch((err) => {
               console.log("files",err)
            })
 
        
    }    
      
    
        return(
            <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>
                  
                <Button title="teste PDF" onPress={() => this.saveFile("1sqw2234w2323","https://divinesia.mg.gov.br/wp-content/uploads/2021/01/Exemplo-de-PDF.pdf", "Exemplo-de-PDF.pdf",) }/>
             { show ?
             <ShowPdf uri = {url} /> : undefined
             }
            </View>
        )
    
    
}

