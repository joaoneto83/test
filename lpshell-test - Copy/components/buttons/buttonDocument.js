import React, { Component } from 'react';
import { Text,TouchableOpacity,Image } from "react-native";

import styles from "./button-styles";

const images  =  require('../../assets/images/infoAssetIcon.png')


export default class ButtonDocument extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super()
    const {title} = props;
    console.log("button",props)
  }

   getTitle(title){
    switch(title) {
        case "Documents":
          this.images = require('../../assets/images/document.png');
          break;
         case "Mappa":
            this.images = require('../../assets/images/map.png');
            break;
          case "Controllo":
                this.images = require('../../assets/images/settings.png');
                break;
        default:
          this.images =  ""
    }
    return this.images
   }
    screem = () => {
      console.log(this.props)
      switch(this.props.title) {
        case "Documents":
          this.props.prop.navigation.navigate("MissioniDocument",  this.props.prop.route.params );
          break;
         case "Mappa":
          this.props.prop.navigation.navigate("mappa");
            break;
        default:
         undefined
    }
    }

  render () {
    return (
         <TouchableOpacity   style={[styles.containerNoBorder,{marginRight:-20}]}   onPress = {()=>  this.screem()}  >
            <Text style={[styles.title, {marginRight:-20}]}>{this.props.prop.route.params.documents.length ||  this.props.documents}</Text>
        <Image
          resizeMode="contain"
          style={styles.icone}
          source={this.getTitle(this.props.title)}/>
         <Text style={[styles.title, {marginLeft:-20}]}>{this.props.title}</Text>
         </TouchableOpacity>
    );
  }
};