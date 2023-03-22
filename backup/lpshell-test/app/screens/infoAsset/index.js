import React, { Component } from 'react';
import { Text, View,Button,TouchableOpacity,Image } from "react-native";
import Scanner from '../../../assets/utils/scan/BarcodeScanner';
import Head from '../../../assets/utils/Head'

import styles from "./styles";



export default class InfoAsset extends Component {


  constructor(props){
      super(props);
      console.log("t",props)
  }
  // static shouldComponentUpdate(props, state) {
  //   console.log("r",props,state)

  // }
  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      console.log("r",props);
      return {
        value: props.value,
      }
    }

    return null;

  }

    home = () => {
      this.props.navigation.navigate('Home');
    };
    scan = () => {
      this.props.navigation.navigate('Scanner',{ screem: this.props.route.params?.screem});
    };
    infoAsset = () => {
      this.props.navigation.navigate('InfoAsset');
    }

  render () {
    return (

      <View style={styles.container}>
        <Head prop = {this.props} routes = "InfoAsset" title ="Info Asset" screem= {this.props.route.params?.screem} ></Head>

        <View style={styles.boxHome}>
        {this.props.route.params?.item ? 
        <TouchableOpacity style={styles.buttonScanSecund}  onPress = {()=>  this.scan()}  >
               <Image
         style={styles.buttonImageIconStyleSecund}
              source={require('../../../assets/images/qrcode.png')}
            />
            <Image
         style={styles.check}
              source={require('../../../assets/images/check.png')}
            />
          </TouchableOpacity>: undefined}
        <TouchableOpacity style={styles.buttonScan}  onPress = {()=>  this.scan()}  >
            <Image
         style={styles.buttonImageIconStyle}
              source={require('../../../assets/images/qrcode.png')}
            />
            <View style={styles.boxInfo}> 
            <Text style={styles.text}>Scan QR code</Text>
            <Text style={styles.textItem}>{this.props.route.params?.item}</Text>
            </View>
             
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCamera}  onPress = {()=>  this.scan()}  >
            <Image
         style={styles.buttonImageStyle}
              source={require('../../../assets/images/camera.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      
    );

  }
  
};
