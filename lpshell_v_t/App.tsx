import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/screens/Login";
import ProfileScreen from "./app/screens/Home";
import infoAssetScreen from "./app/screens/infoAsset";
import InfoAssetDetail from "./app/screens/infoAsset/InfoAssetDetail";
import InfoAssetControllo from "./app/screens/infoAsset/InfoAssetControllo";7
import missioniScreen from "./app/screens/Missioni";
import missioniDetailScreen from "./app/screens/Missioni/MissioniDetail";
import Scanner from "./components/scan/BarcodeScanner";




const Stack = createStackNavigator();
const test = false;
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Home" component={ProfileScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="InfoAsset" component={infoAssetScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="InfoAssetDetail" component={InfoAssetDetail} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="InfoAssetControllo" component={InfoAssetControllo} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Missioni" component={missioniScreen} />
        <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="MissioniDetail" component={missioniDetailScreen} />
       { test ? undefined : <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Scanner" component={Scanner} /> } 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
