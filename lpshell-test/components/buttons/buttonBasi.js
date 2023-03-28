import React, { Component } from 'react';
import { Text,TouchableOpacity,Image } from "react-native";

import styles from "./button-styles";

const images  =  require('../../assets/images/infoAssetIcon.png')


export default class ButtonBasi extends Component {
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
        case "Document":
          this.images = require('../../assets/images/document.png')
          break;
         case "Mappa":
            this.images = require('../../assets/images/map.png')
            break;
          case "Controllo":
                this.images = require('../../assets/images/settings.png')
                break;
        default:
          this.images =  ""
    }

    return this.images
   }
  

    screem = () => {
      // this.props.prop.navigation.navigate(this.props.route);
      console.log(this.props.qrCodes)
      
      if (this.props.qrCodes.length < 2){
        this.props.prop.navigation.navigate('InfoAssetControllo',{ item: "Pannello", screem: "Controllo" }); 
      }else{
        this.props.prop.navigation.navigate('InfoAsset',{ item: "Pannello", screem: "Controllo" });
      }
     
    }

  render () {
    return (
         <TouchableOpacity   style={styles.container}   onPress = {()=>  this.screem()}  >
        <Image
          style={styles.icone}
          source={this.getTitle(this.props.title)}
        />
         <Text style={styles.title}>{this.props.title}</Text>
         </TouchableOpacity>
    );
  }
};
