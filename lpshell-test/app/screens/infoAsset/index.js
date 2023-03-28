import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Image } from "react-native";

import Head from '../../../components/Head'
import QrcodeScreen from '../../../components/scan/qrcodeScreen';

import styles from "./styles";



export default class InfoAsset extends Component {


  constructor(props){
      super(props);
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
        <Head prop = {this.props} routes = "InfoAsset" title ="Info Asset" screem= {this.props.route.params?.screem} />
        <QrcodeScreen data = {this.props} scan={this.scan}/>
      </View>
      
    );

  }
  
};
