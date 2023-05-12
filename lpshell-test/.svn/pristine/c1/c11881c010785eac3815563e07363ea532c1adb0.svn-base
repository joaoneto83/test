import { View, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-community/async-storage'
import React , {useEffect,useRef }from 'react';



import ShowPdf from './showPdf';


export default function DownloadPdf (props){
    const getUrl = useRef("http://192.168.248.20:6090") 
  useEffect(() => {

    if (props.documents) {
        props.documents.map ( item => {
            console.log(props.gifDir)
            saveFile(item.id,item.filePath, item.fileName, item.extension, props.gifDir )
         }
            
         )
    }
 
   } ,[props])

     
     saveFile = async (id,filePath, fileName, extension, gifDir ) => {

        const tokken =   await AsyncStorage.getItem('DATA_KEY').then((response) => { return response.replace(/"/g, '') })
   
        const path = getUrl.current + filePath + "?access_token=" + tokken
        console.log("test",path)
        let te=[]
            FileSystem.downloadAsync(path, gifDir + fileName + extension)
            .then( async ({uri}) => {
                 
           AsyncStorage.setItem(id, JSON.stringify( uri ) );
      
          te = await AsyncStorage.getItem(id).then((response) => {return response})
        //    alert("cache", te, id);
        console.log("ret",te)  
        //   ShowPdf(uri)
            }).catch((err) => {
               console.log("files",err)
            })
  
    }    

}

