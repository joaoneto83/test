import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Image } from "react-native";
import styles from "./styles";
import AsyncStorage from '@react-native-community/async-storage'
import Connected from '../../../assets/connected'; 

export default class Home extends Component {


  visibleModal = 0;
  isConnected = false;
  affet = 0
  // connected = async () => {
  //   return await AsyncStorage.getItem('isConnected').then((response) => { return response })
  //    }

   constructor(props){
    super()
       console.log("tes", props);
    this.state = {
      visibleModal: this.visibleModal,
      isConnected : this.connected,
    }

   }
   callbackisConnected = (item) =>{

   this.setState({
    isConnected: item
    } )

  } 

  goMissioni = () => {
    this.props.navigation.navigate("Mission");

   }

  handleCreateAccountPress = () => {
    this.props.navigation.navigate("InfoAsset");
  };


  render() {
  return (

    <View style={styles.container}>
          <View style={styles.boxHead}>
          <Connected  callbackisConnected = {this.callbackisConnected}></Connected>
          <Image
            resizeMode="contain"
        style={styles.icone}
        source={require('../../../assets/images/icone.png')}
      />
          <Text style={styles.title}>Benvenuto in Logica Pro</Text>
          </View>
        
      <View style={styles.box}>

         <TouchableOpacity      style={styles.button}  onPress = { this.state.isConnected ? ()=>  this.handleCreateAccountPress() :undefined}  >
          <Image
      resizeMode="contain"
       style={ this.state.isConnected  ? styles.buttonImageIconStyle : [ styles.buttonImageIconStyle,{ opacity:0.5 } ] }
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
            style={this.state.isConnected  ? styles.buttonImageIconStyle : [ styles.buttonImageIconStyle,{ opacity:0.5 } ]}
            source={require('../../../assets/images/Mappa.png')}
          />
        </TouchableOpacity>
  
        </View>
    </View>
    
  );
}
}
