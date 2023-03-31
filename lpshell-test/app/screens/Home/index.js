import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Image } from "react-native";
import styles from "./styles";



export default class Home extends Component {

   constructor(props){
    super()
       console.log("tes", props)
   }
 
   goMissioni = () => {
    this.props.navigation.navigate("Mission")
   }

 handleCreateAccountPress = () => {
    this.props.navigation.navigate("InfoAsset");
  };


  render() {
  return (

    <View style={styles.container}>
     
    
          <View style={styles.boxHead}>
          <Image
            resizeMode="contain"
        style={styles.icone}
        source={require('../../../assets/images/icone.png')}
      />
          <Text style={styles.title}>Benvenuto in Logica Pro</Text>
          </View>
        
      <View style={styles.box}>
      <TouchableOpacity      style={styles.button}  onPress = {()=>  this.handleCreateAccountPress()}  >
          <Image
      resizeMode="contain"
       style={styles.buttonImageIconStyle}
            source={require('../../../assets/images/InforAssetButton.png')}
          />
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}  activeOpacity={0.5} onPress = { ()=> this.goMissioni()}>
          <Image
             resizeMode="contain"
            style={styles.buttonImageIconStyle}
            source={require('../../../assets/images/massioni.png')}
          />
       </TouchableOpacity>
        <TouchableOpacity  style={styles.button}  activeOpacity={0.5}>
          <Image
           resizeMode="contain"
            style={styles.buttonImageIconStyle}
            source={require('../../../assets/images/Mappa.png')}
          />
        </TouchableOpacity>
  
        </View>
    </View>
    
  );
}
}
