import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/screens/Login";
import ProfileScreen from "./app/screens/Home";
import infoAssetScreen from "./app/screens/infoAsset";
import InfoAssetDetail from "./app/screens/infoAsset/InfoAssetDetail";
import InfoAssetControllo from "./app/screens/infoAsset/InfoAssetControllo";
import Scanner from "./assets/utils/scan/BarcodeScanner";



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
       { test ? undefined : <Stack.Screen options={ {title:'',headerTransparent:true, headerShown:false}}  name="Scanner" component={Scanner} /> } 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
