import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import React, { useState, useEffect } from 'react';


export default function ShowPdf (props){

       useEffect(() => {
        showFile()
   },[props.uri]
   )
  
showFile =  async () => {
    console.log("show",props.uri)
    try {
        alert(props.uri);
            const cUri = await FileSystem.getContentUriAsync(props.uri);
            await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                data: cUri,
                flags: 1,
                type: "application/pdf",
            });
          
          }catch(e){
            alert("erro",uri);
              console.log(e.message);
          }
  }

}