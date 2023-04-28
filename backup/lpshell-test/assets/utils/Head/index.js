import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Image } from "react-native";

import styles from "./styles";

const images  =  require('../../../assets/images/infoAssetIcon.png')

export default class Head extends Component {

  constructor(props){
    super()
    const {title, screem} = props;
    console.log("s",props, this.state)
  } 
  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      return {
        value: props.value,
      }
    }
    return null;
  }
  // static getDerivedStateFromProps(props, state){
  //   this.setState({
  //     title: this.props?.title,
  //     screem: this.props?.screem
  //   })
  // }
   getTitle(title){
    switch(title) {
        case "Info Asset":
          this.images = require('../../../assets/images/infoAssetIcon.png')
          break;
        default:
          this.images = require('../../../assets/images/infoAssetIcon.png')
    }

    return this.images
   }
  
    home = () => {
      console.log("title", this.props.routes);
      this.props.prop.navigation.navigate('Home');
    };

    screem = () => {
      this.props.prop.navigation.navigate(this.props.routes);
    }

  render () {
    return (
      <View style={styles.container}>
         <View style={styles.boxHead}>
         <TouchableOpacity  onPress = {()=>  this.home()} >
        <Image
          style={styles.iconeLP}
          source={require('../../../assets/images/icone.png')}
        />
         </TouchableOpacity>
         <TouchableOpacity   style={styles.buttonHead}   onPress = {()=>  this.screem()}  >
        <Image
          style={styles.icone}
          source={this.getTitle(this.props?.title)}
        />
         </TouchableOpacity>
         <Text style={styles.title}>{this.props?.title}</Text>
         <Text style={styles.subTitle}>{this.props?.screem}</Text>
         </View>
      </View>
    );
  }
};
