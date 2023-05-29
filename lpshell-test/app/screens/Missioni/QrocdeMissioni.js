import React, { Component } from 'react';
import {View, TouchableOpacity, Image,TextInput, Text} from "react-native";
import Modal from 'react-native-modal';

import Head from '../../../components/Head'
import QrcodeScreen from '../../../components/scan/qrcodeScreen';
import LoadingInline from "../../../components/loading/loadingInline";
import ButtonSave from "../../../components/buttons/ButtonSave";
import ButtonRadioQRcode from "../../../components/buttons/ButtonRadioQRcode";
import styles from "./styles";

export default class QrcideMissioni extends Component {
  constructor(props){
      super(props);
     
      this.state ={
        loading: false,
        callbackButtonRadio:"Senza QRcode",
        callbackText:"",
        visibleModal:null
      }

  }
  // static shouldComponentUpdate(props, state) {
  //   console.log("r",props,state)
  // }
  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      console.log("missionr",props.route.params?.listQrCodeRadix);
      return {
        value: props.value,
      }
    }
    return null;
    }
    home = () => {
      this.props.navigation.navigate('Home');
    };
    modalQRcode = () => {
      console.log("ok")
   
      this.setState({ visibleModal: 1 })
     
    }
    _renderButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <Image
                          style={styles.imagemClose}
                          source={require('../../../assets/images/close.png')}
                        />
      </TouchableOpacity>
    );
    _callbackButtonRadio=(item)=>{
       this.setState(
        {
          callbackButtonRadio: item
        }
       )
    }
    _callbackText=(text)=>{
      this.setState(
        {
          callbackText: text
        }
       )
    }
    callbackSave =() =>{
      console.log("ok", this.state.callbackButtonRadio, this.state.callbackText )
    }
    _renderModalContent = () => (
      <View style={styles.modalContent}> 
        <View style={{flex:0, alignItems:"center"}} >
        {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>
        <View style={{flex:0,}} >
        <View style={{flexDirection:"row", padding:20, paddingLeft:5}}>
        <ButtonRadioQRcode callbackButtonRadio={this._callbackButtonRadio}/>
        </View>
        <Text style={{fontSize:20, color: "#787777",padding:20, paddingLeft:5 }}>Messaggio : </Text>
        <TextInput onChangeText= {(text)=> this._callbackText(text) } style={{backgroundColor:"#e9e9ee", minWidth:"100%", minHeight:"20%",  marginRight:-30,  borderRadius:5, padding:10, fontSize:20}}/>
        <View style={{flexDirection:"row-reverse", paddingTop:20,  marginLeft:-40,}} >
        <ButtonSave callbackSave={this.callbackSave}/>
        </View>
        </View>
      </View>
    );
    scan = () => {
    this.setState({loading:true})
   setTimeout(()=> {
    this.props.navigation.navigate('Scanner',
    { 
     routes:"Mission",  
     mission: this.props.route.params?.mission,  
     title:"Missioni", 
     documents: this.props.route.params?.documents, 
     screem :"Dettagli",
     assetCodeId: this.props.route.params?.assetCodeId, 
     qrcodeValue: this.props.route.params?.qrcodeValue, 
     qrCodeRadix: this.props.route.params?.qrCodeRadix,
     listQrCodeRadix: this.props.route.params?.listQrCodeRadix
    }
     );
   })     
  };
  render () {
    return (
      <View style={styles.containerMission}>
            <Modal     isVisible={this.state.visibleModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
            </Modal>
        <Head prop = {this.props} routes="Mission"  title ="Missioni" id ={this.props?.route?.params?.mission.id || this.props?.route?.params?.mission}  screem ="Dettagli" subTitle ="Controllo" search ="false" modalQRcode={this.modalQRcode}/>
       
        <QrcodeScreen data = {this.props} scan={this.scan}/>
      </View>
    );
  }
};
