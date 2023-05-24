import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/screens/Login";
import ProfileScreen from "./app/screens/Home";
import infoAssetScreen from "./app/screens/infoAsset";
import InfoAssetDetail from "./app/screens/infoAsset/InfoAssetDetail";
import InfoAssetControllo from "./app/screens/infoAsset/InfoAssetControllo";
import missioniScreen from "./app/screens/Missioni";
import refreshScreen from "./app/screens/Missioni/refresh";
import refreshMissioniDetailScreen from "./app/screens/Missioni/RefreshMissioniDetail";
import missioniDetailScreen from "./app/screens/Missioni/MissioniDetail";
import qrcideMissioniScreen from "./app/screens/Missioni/QrocdeMissioni";
import MissioniControlloScreen from "./app/screens/Missioni/MissioniControllo";
import MissioniDocumentScreen from "./app/screens/Missioni/MissioniDocument";
import Scanner from "./components/scan/BarcodeScanner";
import PhotoScreen from './components/camera/cameraTake';
import InfoDocumentScreen from "./app/screens/infoAsset/InfoDocument";



const Stack = createStackNavigator();
const test = false;
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator detachInactiveScreens={false} initialRouteName="Login">
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Home" component={ProfileScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="InfoAsset" component={infoAssetScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="InfoAssetDetail" component={InfoAssetDetail} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="InfoAssetControllo" component={InfoAssetControllo} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="InfoDocument" component={InfoDocumentScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Mission" component={missioniScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Refresh" component={refreshScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="RefreshMissioniDetail" component={refreshMissioniDetailScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="MissioniDetail" component={missioniDetailScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="MissioniControllo" component={MissioniControlloScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="MissioniDocument" component={MissioniDocumentScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="QrcideMissioni" component={qrcideMissioniScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Photo" component={PhotoScreen} /> 
       { test ? undefined : <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Scanner" component={Scanner} /> } 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
