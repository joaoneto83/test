import React, { Component } from 'react';
import { View,Text,TouchableOpacity,Image,TextInput } from "react-native";

import styles from "./style";
import ButtonSave from "../buttons/ButtonSave"

const images  =  require('../../assets/images/infoAssetIcon.png')


export default class Search extends Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props){
    super()
    const {title} = props;

    this.state = {
      backData: props?.data
    }

    console.log("search",props)
  }





 getSearch = (item,text) => {
  this.props?.fields.map( x => {
    if (x.value == item){
      x.search = text
    }
    this.setState(
      { 
        backData: this.props?.data.filter((x) => {
        return x[item].toLowerCase().indexOf(text.toLowerCase()) > -1 
        })

      }) 
  }
    ) 
  }

  callbackSave = () => {
    this.props.advancedSearch(this.state.backData)
  }

  render () {
    return (
        <View   style={styles.container}   >
            {
                this.props.fields.flat().map((item)=> (
                    <View key={item.field} style={styles.container} >
                    <Text>{item.field}</Text>
                    <TextInput
                    style={styles.input}
                    placeholder=""
                    onChangeText={(text) => this.getSearch(item.value, text) }
                  />
                    </View>
                )
                )
            }
            <TouchableOpacity style={styles.boxButtonSave}>
            <ButtonSave callbackSave={this.callbackSave} name={"Cercare"}/>
            </TouchableOpacity>
        
         </View>
    );
  }
};


