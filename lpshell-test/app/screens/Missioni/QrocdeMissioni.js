import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Image } from "react-native";

import Head from '../../../components/Head'
import QrcodeScreen from '../../../components/scan/qrcodeScreen';

import styles from "./styles";



export default class QrcideMissioni extends Component {


  constructor(props){
      super(props);
  }
  // static shouldComponentUpdate(props, state) {
  //   console.log("r",props,state)

  // }
  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      console.log("mission",props);
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
      this.props.navigation.navigate('Scanner',{routes:"Mission", title:"Missioni", procedureId:this.props.route.params?.procedureId, screem: this.props.route.params?.screem});
    };


  render () {
    return (
      <View style={styles.containerMission}>
        <Head prop = {this.props}  title ="Missioni"/>
        <QrcodeScreen data = {this.props} scan={this.scan}/>
      </View>
    );
  }
};
