import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./styles";
import AsyncStorage from '@react-native-community/async-storage';

const images = require('../../assets/images/infoAssetIcon.png')

export default class Head extends Component {

  constructor(props) {
    super()
    const { title, screem } = props;
    this.state = {
      text: '',
      visibleModal: null
    };
    console.log("head-----", props, this.state)
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
 
  getTitle(title) {
    switch (title) {
      case "Info Asset":
        this.images = require('../../assets/images/infoAssetIcon.png')
        break;
      case "Missioni":
        this.images = require('../../assets/images/clipboard.png')
        break;
      default:
        this.images = require('../../assets/images/infoAssetIcon.png')
    }
    return this.images
  }

  home = () => {
    this.props.prop.navigation.navigate('Home');
  };

  mission = async (id) => {
    console.log("ok11",this.props.id)
    let dataMission = await AsyncStorage.getItem(this.props.id.toString()).then((response) => { return JSON.parse(response) })
    console.log("ok12",this.props.id)
    this.props.prop.navigation.navigate("MissioniDetail", {data: dataMission, offline:true})
  };

  screem = () => {
    console.log("screen",this.props)
    if (this.props.routes == "Mission"){
      this.props.prop.navigation.navigate("Refresh");
      

     if (this.props?.missioniCache){
      this.props?.missioniCache()
     }
       
   
     
    }else {
      this.props.prop.navigation.navigate(this.props.routes);
    }
   

  }

  render() {
    return (
      <View style={styles.container}>
       
        <TouchableOpacity onPress={() => this.home()} >
          <Image
            resizeMode="contain"
            style={styles.iconeLP}
            source={require('../../assets/images/icone.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHead}   onPress={() => this.screem()} >
          {this.props?.title == "Missioni" ? <Image
            resizeMode="contain"
            style={styles.iconeMissioni}
            source={this.getTitle(this.props?.title)}
          /> : <Image
            resizeMode="contain"
            style={styles.icone}
            source={this.getTitle(this.props?.title)}
          />}
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => this.screem()} >
        <Text style={styles.title}>{this.props?.title}</Text>
        </TouchableOpacity>
        { this.props?.screem ? 
        <TouchableOpacity style={styles.buttonHead}   onPress={() => this.props?.screem == "Dettagli" ? this.mission(this.props.id) : this.props.prop.navigation.goBack(null) }>
        <Text style={styles.subTitle}>{this.props?.screem}</Text>
        </TouchableOpacity> : undefined
        }

        <Text style={styles.subTitle}>{this.props?.subTitle}</Text>
        <View style={styles.containerSearch}>
          { this.props?.modalQRcode  ?
               <TouchableOpacity style={styles.buttonQRCode}   onPress={() => this.props?.modalQRcode()} >
               <Text style={styles.textQRcode}>senza QR code</Text>
            </TouchableOpacity>: undefined
           }
     
          {this.props?.search == "true" ?
            <View style={styles.boxSearch}>
              <Image
               resizeMode="contain"
                style={styles.iconeSearch}
                source={require('../../assets/images/search.png')}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.props.getSearch(text)}
                placeholder=""
              />
              {/* { this.props.adancedSearch ?
                    <TouchableOpacity onPress= {()=> this.props.adancedSearch(1)} >
                    <Image
                     resizeMode="contain"
                      style={styles.iconeSearch}
                      source={require('../../assets/images/filter.png')}
                    />
                    </TouchableOpacity>: undefined
              } */}
          
               
            </View> : undefined}
      
        </View>
        {/* { this.props.offline ?
        <View style={{flexDirection:"row"}}>
                   <Text style={[styles.offlineTitle, {color:"red", marginLeft:20}]}>off-line</Text>
                   <View style={{width:15, height:15, borderRadius:20, backgroundColor:"red"}} ></View>
          </View>
   
            :undefined
            } */}
      </View>
    );
  }
};


