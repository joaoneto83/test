import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,SafeAreaView, } from "react-native";
import Head from '../../../components/Head';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';


import styles from "./styles";
import ButtonSave from '../../../components/buttonBasi/ButtonSave';
import ButtonEsc from '../../../components/buttonBasi/ButtonEsc';
import ListProcedura from '../../../components/list/listProcedura';
import ListControllo from '../../../components/list/listControllo';
import CameraRnc from '../../../components/camera';
import Gallery from '../../../components/gallery'




const baseURLGet = " http://192.168.248.20:6090/api/assets/asset/QR/";
const baseUrlGetControllo = "http://192.168.248.20:8090/Api/Asset/AvailableProcedures/"
const basePost = "http://192.168.248.20:8090/Api/ProcedureAsset"


export default class InfoAssetControllo extends Component { 

  constructor(props) {

  super(props);
    this.state = {
      data: { attributes: [] },
      dataArray: [],
      dataControlloArray: [],
      Authorization: "",
      qrCode: this.props.route.params.value,
      expand: true,
      visibleModal: null,
    }
    this.getData();
 
  }
  postData= {
    procedureId: "",
    assetId:"",
    assetValue:[],
  }
  assetValueData = {
    procedureAttributeId:"",
    value:""
  }
 

  callbackProcedura = (item) => {
    this.setState({
      dataControlloArray: item
    })
    this.postData.procedureId = item.id

  }
  callbackControllo = (item) => {

    this.postData.assetValue = this.state.dataControlloArray.attributes.map( (data)=> 
    { 
      if (item.id == data.id) {
        x = {
          procedureAttributeId: item.id,
          value: item.value.toString()
          } 
      }else {
        x = {
          procedureAttributeId: data.id,
          value: data.goodValue
          } 
      }

    return x
   
     })
     console.log("callbackProcedura ",   this.postData.assetValue)
  }

  callbackEsc = () => {
    console.log("callbackEsc")
  }
  callbackSave = async () => {
    this.setState({
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
    })
    
    console.log("callbackSalvett",  this.postData)
  await axios.post(basePost ,this.postData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
      }
    }).then((response) => {
   
      console.log("ok", response)
    });
  }
  returnProdocedura = () => {
    
    this.setState({
      dataControlloArray: []
    })
  }
  getExpand = ()=>{
   
   this.setState({
       expand: !this.state.expand
    })
  }
  getData = async () => {
    this.state = {
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
      qrCode: this.props.route.params.value,
    }
    await axios.get(baseURLGet + this.state.qrCode.replace(/%/g, ''), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
      }
    }
    )
      .then((response) => {
        this.getControllo(response.data?.id);
        this.setState({
          data: response.data,
        })
        this.postData.assetId = response.data?.id,
        console.log("p chamada", this.state)
      });
  }
  getControllo = async (item) => {
    console.log("item", item)
    await axios.get(baseUrlGetControllo + item, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
      }
    }
    )
      .then((response) => {
        this.setState({
          dataArray: response.data,
        })
        console.log("segunda chamada", response.data)
      });
  }
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <Image
                        style={styles.imagemClose}
                        source={require('../../../assets/images/close.png')}
                      />
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
        {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        {/* <Gallery /> */}
         <CameraRnc /> 
    </View>
  );
  onCameraReady = () => {
    isCameraReady = true
  };

  render() {
    return (
     
      <View style={{ flex: 1 }}  >
  
    

   

            <Modal     isVisible={this.state.visibleModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
                </Modal>
        <Head prop={this.props} route="InfoAsset" title="Info Asset" screem={this.props.route.params?.screem} ></Head>
        <ScrollView horizontal={true}>
          <View style={styles.containerControllo}>

            <View style={styles.boxControlloLeft}>
              { !this.state.expand ? 
              <View style={styles.boxFlex}>
              <Text style={styles.title}>Dettaglio</Text>
              <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.getExpand()}>
                      <Image
                        style={styles.imagemCheronI}
                        source={require('../../../assets/images/chevron.png')}
                      />
              </TouchableOpacity>
              </View>
              :<View>
              <View style={styles.boxFlex}>
              <Text style={styles.title}>Dettaglio</Text>
              <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.getExpand()}>
                      <Image
                        style={styles.imagemChevron}
                        source={require('../../../assets/images/chevron.png')}
                      />
              </TouchableOpacity>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Descrizione -</Text>
                <Text style={styles.infoDetail}>{this.state.data.description}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Marca -</Text>
                <Text style={styles.infoDetail}>{this.state.data.factory}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Numero - </Text>
                <Text style={styles.infoDetail}> {this.state.data.keyNum}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Anno di produzione - </Text>
                <Text style={styles.infoDetail}> {this.state.data.productionYear}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Matricola -</Text>
                <Text style={styles.infoDetail}>{this.state.data.register}</Text>
              </View>
              {/* {this.state.data.attributes.map((item) => (
                        <View style={styles.boxInfo}>
                            <Text style={styles.label}>{item.attribute.description} - </Text>
                            <Text style={styles.info}> {item.value}</Text>
                        </View>
                    ))} */}
              <View style={styles.boxImage}>

                <TouchableOpacity onPress={ () =>
                      this.setState({ visibleModal: 1 })}>
                  <Image
                    style={styles.buttonImage}
                    source={require('../../../assets/images/icon_picture.png')}
                  />
                </TouchableOpacity>

              </View>
              </View>}
             
            </View>
            <View style={styles.boxControlloRight}>

              {this.state.dataArray.length != 0 && this.state.dataControlloArray.length == 0 ?

                <ListProcedura list={this.state.dataArray} callbackProcedura={this.callbackProcedura} />
                : undefined
              }
              {this.state.dataControlloArray.length != 0 ?
                <View>
                  <ListControllo list={this.state.dataControlloArray} callbackControllo = {this.callbackControllo} />
                  <View style={styles.boxButtonSave} >
                    <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.returnProdocedura()}>
                      <Image
                        style={styles.ImagemButton}
                        source={require('../../../assets/images/arrow.png')}
                      />
                    </TouchableOpacity>
                    <View style={styles.boxButtonSave}>
                      <ButtonEsc callbackEsc={this.callbackEsc} />
                      <ButtonSave callbackSave={this.callbackSave} procedura={this.state.dataControlloArray}  />
                    </View>
                  </View>
                </View>
                : undefined
              }



            </View>

          </View>
        </ScrollView>
      </View>

    );

  }

};
