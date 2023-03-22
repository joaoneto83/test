import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Head from '../../../assets/utils/Head';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

import styles from "./styles";
import ButtonSave from '../../../assets/utils/buttonBasi/ButtonSave';
import ButtonEsc from '../../../assets/utils/buttonBasi/ButtonEsc';
import ListProcedura from '../../../assets/utils/list/listProcedura';
import ListControllo from '../../../assets/utils/list/listControllo';
import Gallery from '../../../assets/utils/gallery'



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
      visibleModal: null
    }
    this.getData();
  }
 

  callbackProcedura = (item) => {
    this.setState({
      dataControlloArray: item
    })
  }
  callbackEsc = () => {
    console.log("callbackEsc")

  }
  callbackSave = async () => {
    this.setState({
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
    })
    
    console.log("callbackSalvett",  this.state.Authorization.replace(/"/g, ''))
    await axios.post(basePost , {
      "procedureId": "0eda1a67-5136-4599-a4ca-8880a67bd5f8",
      "assetId": "5f4ebb3f-7782-46fa-be87-08b25f5aed2b",
      "assetValue": [
     
       {
          "procedureAttributeId": "20973f0a-82bd-4ec1-9e88-497cc65097ef",
          "value": "Corretto"
        },
     
       {
          "procedureAttributeId": "3036cfd8-7cb1-46da-9517-b3494cfceb39",
          "value": "true"
        },
         
       {
          "procedureAttributeId": "e9b61be4-e041-44ce-91cc-c65483fa745a",
          "value": "10"
        },
        {
          "procedureAttributeId": "8399d6a4-a916-4d13-9b9a-f8e81da79eae",
          "value": ""
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
      }
    })
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
    console.log("callbackSalve",  this.state)
    console.log("t", this.state, this.state.qrCode, this.props.route.params.value)
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
          dataArray: response.data
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
        <Gallery />
    </View>
  );

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
                  <ListControllo list={this.state.dataControlloArray} />
                  <View style={styles.boxButtonSave} >
                    <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.returnProdocedura()}>
                      <Image
                        style={styles.ImagemButton}
                        source={require('../../../assets/images/arrow.png')}
                      />
                    </TouchableOpacity>
                    <View style={styles.boxButtonSave}>
                      <ButtonEsc callbackEsc={this.callbackEsc} />
                      <ButtonSave callbackSave={this.callbackSave} />
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
