import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';



export default async function  showFile(props) {
    try {
        // alert(props.uri);
            const cUri = await FileSystem.getContentUriAsync(props);
            await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                data: cUri,
                flags: 1,
                type: "application/pdf",
            });
          }catch(e){
            alert("erro",uri);
              console.log("errou",e.message);
          }
  }