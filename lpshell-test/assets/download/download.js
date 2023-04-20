import React from 'react';
import { View, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { requestPermissionsAsync, MediaLibrary} from 'expo-media-library';


class DownloadT extends React.Component {
    constructor(props) {
        super(props)
    }


    async saveFile() {
        const permission = await requestPermissionsAsync();


        console.log("ok1")
      if (permission.status !== 'granted') {
 
            FileSystem.downloadAsync("http://www.pdf995.com/samples/pdf.pdf", FileSystem.documentDirectory + 'test.pdf')
            .then( async ({uri}) => {
                console.log("ok", uri)
                await MediaLibrary.createAssetAsync(uri)
            }).catch((err) => {
               console.log(err)
            })

        // try {
        //   const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        //   const album = await MediaLibrary.getAlbumAsync('Download');
        //   if (album == null) {
        //     await MediaLibrary.createAlbumAsync('Download', asset, false);
        //   } else {
        //     await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        //   }
        // } catch (e) {
        //   handleError(e);
        // }
        }

        // const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        // if (perm.status != 'granted') {
        //   return;
        // }
        
        // try {
        //   const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        //   const album = await MediaLibrary.getAlbumAsync('Download');
        //   if (album == null) {
        //     await MediaLibrary.createAlbumAsync('Download', asset, false);
        //   } else {
        //     await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        //   }
        // } catch (e) {
        //   handleError(e);
        // }


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