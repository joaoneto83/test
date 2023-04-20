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
        const permission = await requestPermissionsAsync();


        console.log("ok1")
      if (permission.status !== 'granted') {
 
            FileSystem.downloadAsync("http://www.pdf995.com/samples/pdf.pdf", FileSystem.documentDirectory + 'testr.pdf')
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
                      console.log(e.message);
                  }
            }).catch((err) => {
               console.log(err)
            })

        
        }

    }
    render(){
        return(
            <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>
                <Button title="Create PDF" onPress={() => this.saveFile()}/>
            </View>
        )
    }
    
}
export default DownloadT
