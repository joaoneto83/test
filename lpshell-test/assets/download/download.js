import React from 'react';
import { View, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import { requestPermissionsAsync, MediaLibrary} from 'expo-media-library';


class DownloadT extends React.Component {
    constructor(props) {
        super(props)
    }


    async saveFile() {
       


        console.log("ok1")

 
            FileSystem.downloadAsync("http://www.pdf995.com/samples/pdf.pdf", FileSystem.documentDirectory + 'tes.pdf')
            .then( async ({uri}) => {
                console.log("ok", uri)
                alert(uri);
                // await MediaLibrary.createAssetAsync(uri)
                try {
                    const cUri = await FileSystem.getContentUriAsync(uri);
                    await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                        data: cUri,
                        flags: 1,
                        type: "application/pdf",
                    });
                  
                  }catch(e){
                    alert("erro",uri);
                      console.log(e.message);
                  }
            }).catch((err) => {
               console.log(err)
            })

        
    }
    render(){
        return(
            <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>
                <Button title="teste PDF" onPress={() => this.saveFile()}/>
            </View>
        )
    }
    
}
export default DownloadT
