import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,SafeAreaView } from "react-native";
import Head from '../../../components/Head';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';


import styles from "./styles";
import ButtonSave from '../../../components/buttons/ButtonSave';
import ButtonEsc from '../../../components/buttons/ButtonEsc';
import ListProcedura from '../../../components/list/listProcedura';
import ListControllo from '../../../components/list/listControllo';
import Gallery from '../../../components/gallery';
import CameraS from '../../../components/camera/CameraS';
import LoadingInline from "../../../components/loading/loadingInline";




const baseURLGet = "http://192.168.248.20:6090/api/assets/asset/QR/";
const baseUrlGetControllo = "http://192.168.248.20:8090/Api/Asset/AvailableProcedures/"
const basePost = "http://192.168.248.20:8090/Api/ProcedureAsset"


export default class InfoAssetControllo extends Component { 

  off = false
  // data = {
  //   "description": "Estintore 1 reparto presse",
  //   "keyNum": 1,
  //   "idAssetType": "e1a52135-6530-448c-bcac-b146babe2ccc",
  //   "qrCodes": [
  //     {
  //       "description": "Etichetta",
  //       "sequenceNumber": 1
  //     },
  //     {
  //       "description": "Carrello",
  //       "sequenceNumber": 0
  //     }
  //   ],
  //   "attributes": [
  //     {
  //       "attribute": {
  //         "id": "c5208d79-5fc9-4da1-8ca9-04bcee027029",
  //         "description": "Carrellato"
  //       },
  //       "value": "true"
  //     },
  //     {
  //       "attribute": {
  //         "id": "01de8210-c137-4e80-9635-1e4332ce7ab1",
  //         "description": "Peso"
  //       },
  //       "value": "35"
  //     },
  //     {
  //       "attribute": {
  //         "id": "21ef4c99-9448-41a5-b22c-d5568edd43b3",
  //         "description": "Posizionamento"
  //       },
  //       "value": "Dietro la pressa 20000"
  //     },
  //     {
  //       "attribute": {
  //         "id": "5ad9b23a-372a-4d8d-b805-fdb4056c3096",
  //         "description": "Estinguente"
  //       },
  //       "value": "Polvere"
  //     }
  //   ],
  //   "register": "100891",
  //   "productionYear": 1999,
  //   "factory": "Fire inc.",
  //   "revisionFrequence": 1,
  //   "maintenanceFrequence": 3,
  //   "id": "5f4ebb3f-7782-46fa-be87-08b25f5aed2b"
  // }

  // dataControllo = [
  //   {
  //     "id": "0eda1a67-5136-4599-a4ca-8880a67bd5f8",
  //     "name": "Procedura mensile estintori a polvere",
  //     "assetTypeId": "e1a52135-6530-448c-bcac-b146babe2ccc",
  //     "assetAttributeId": null,
  //     "designedValue": null,
  //     "attributes": [
  //       {
  //         "goodValue": "Corretto",
  //         "format": 4,
  //         "list": [
  //           {
  //             "value": "Corretto"
  //           },
  //           {
  //             "value": "Errato"
  //           },
  //           {
  //             "value": "Mancante"
  //           }
  //         ],
  //         "id": "20973f0a-82bd-4ec1-9e88-497cc65097ef",
  //         "description": "Numerato"
  //       },
  //       {
  //         "goodValue": "true",
  //         "format": 3,
  //         "list": [],
  //         "id": "3036cfd8-7cb1-46da-9517-b3494cfceb39",
  //         "description": "Presente"
  //       },
  //       {
  //         "goodValue": "10",
  //         "format": 2,
  //         "list": [],
  //         "id": "e9b61be4-e041-44ce-91cc-c65483fa745a",
  //         "description": "Pressione"
  //       },
  //       {
  //         "goodValue": "1",
  //         "format": 1,
  //         "list": [],
  //         "id": "8399d6a4-a916-4d13-9b9a-f8e81da79eae",
  //         "description": "Nota"
  //       }
  //     ]
  //   },
  //   {
  //     "id": "f9143d41-2da2-4362-a026-97d0014e64e7",
  //     "name": "Procedura settimana",
  //     "assetTypeId": "e1a52135-6530-448c-bcac-b146babe2ccc",
  //     "assetAttributeId": null,
  //     "designedValue": null,
  //     "attributes": [
  //       {
  //         "goodValue": "Arrotolata correttamente",
  //         "format": 4,
  //         "list": [
  //           {
  //             "value": "Arrotolata correttamente"
  //           },
  //           {
  //             "value": "Srotolata scorrettamente"
  //           }
  //         ],
  //         "id": "edfa744b-d91c-438a-9bee-48b63cc2b9bf",
  //         "description": "Stato della manichetta"
  //       },
  //       {
  //         "goodValue": "Corretto",
  //         "format": 4,
  //         "list": [
  //           {
  //             "value": "Corretto"
  //           },
  //           {
  //             "value": "Errato"
  //           },
  //           {
  //             "value": "Mancante"
  //           }
  //         ],
  //         "id": "20973f0a-82bd-4ec1-9e88-497cc65097ef",
  //         "description": "Numerato"
  //       },
  //       {
  //         "goodValue": "false",
  //         "format": 3,
  //         "list": [],
  //         "id": "90dcbc00-aad4-48de-b403-a34ee0cb5592",
  //         "description": "Anomalie"
  //       },
  //       {
  //         "goodValue": "true",
  //         "format": 3,
  //         "list": [],
  //         "id": "3036cfd8-7cb1-46da-9517-b3494cfceb39",
  //         "description": "Presente"
  //       }
  //     ]
  //   }

  // ]

  constructor(props) {

  super(props);
    this.state = {
      data:  [],
      dataArray: this.dataControllo,
      dataControlloArray: [],
      Authorization: "",
      qrCode: this.props.route.params.value,
      expand: true,
      visibleModal: null,
      visibleModalSave: null,
      visibleModalGallery:null,
      loading:true
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

    this.postData.assetValue = this.state?.dataControlloArray?.attributes?.map( (data)=> 
    { 
      if (item.id == data.id) {
     
        x = {
          procedureAttributeId: item.id,
          value: item.value.toString()
          } 
         
          return x
        
      }else {
        x = {
          procedureAttributeId: data.id,
          value: data.goodValue
          }
          return x
      }
       
   
     })
     console.log("callbackProcedura ",  this.postData.assetValue)
  }

  callbackEsc = () => {
    console.log("callbackEsc")
  }

  callbackSave = async () => {
    this.setState({ visibleModal: null,
      visibleModalSave: 1,
  
        loading: true
   
     })
    this.setState({
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
    })
    
    console.log("callbackSalvett", this.postData)
     await axios.post(basePost ,this.postData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
      }
    }).then((response) => {
      this.setState({
        loading:false
      })
      console.log("ok", response)
    }).catch((error)=> {
      this.setState({
        loading:false
      })
    }
      
    )
  }
  returnProdocedura = () => {
    
    this.setState({
      dataControlloArray: [],

    })
  }

  getExpand = ()=>{
   
   this.setState({
       expand: !this.state.expand
    })

  }

  getData = async () => {
    if(this.off){
      this.setState({
        data: this.data,
      })
      this.getControllo(this.data?.id);
      console.log("off", this.state.data)
    }else{
      console.log("on", this.props.route.params)
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
          console.log("aa", response.data?.id)
          this.getControllo(response.data?.id);
          this.state = {
            data: response.data,
          }
          this.setState({
            data: response.data,
          })
          this.postData.assetId = response.data?.id,
          console.log("p chamada", this.state)
        }).catch((erro) => {
          console.log("erro", erro)
      }
      )
    }


 
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
        loading:false
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
  _renderModalContentSave = () => (
    <View style={styles.modalContentSave}>
      <View style={{flex:0, flexDirection:"row-reverse"}}> 
      {this._renderButton('Close', () => this.setState({ visibleModalSave: null }))}
      </View>
      <View>
      <Text style={styles.titleSave}>Salvato con successo!</Text>
      </View>
      
    </View>
    
  );
  _renderModalContentGallery = () => (
    <View style={styles.modalContent}>
        {this._renderButton('Close', () => this.setState({ visibleModalGallery: null }))}
        <Gallery />
    </View>
    
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      
      <View style={{flex:0, alignItems:"center"}} >
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
      <TouchableOpacity>
    <View style={{width:50, height:50, borderColor:"#E4A83B", borderWidth:2, borderRadius:100, marginTop:200}}/>
    </TouchableOpacity>
      </View>

      <CameraS/>
  
    </View>
    
  );
  onCameraReady = () => {
    isCameraReady = true
  };

  render() {
    return (
     
      <View style={{ flex: 1}}  >
            <Modal     isVisible={this.state.visibleModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
           
            </Modal>
              
                <Modal     isVisible={this.state.visibleModalSave === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContentSave()}
                </Modal>
                <Modal     isVisible={this.state.visibleModalGallery === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContentGallery()}
                </Modal>
             
             
        <Head prop={this.props} routes="InfoAsset" title="Info Asset" screem={this.props.route.params?.screem} ></Head>
        { this.state.loading ? <LoadingInline/> : undefined  } 
        <ScrollView>
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
                <Text style={styles.infoDetail}>{this.state?.data?.description}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Marca -</Text>
                <Text style={styles.infoDetail}>{this.state?.data?.factory}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Numero - </Text>
                <Text style={styles.infoDetail}> {this.state?.data?.keyNum}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Anno di produzione - </Text>
                <Text style={styles.infoDetail}> {this.state?.data?.productionYear}</Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Matricola -</Text>
                <Text style={styles.infoDetail}>{this.state?.data?.register}</Text>
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
                    source={require('../../../assets/images/camera.png')}
                  />
          
                </TouchableOpacity>
                <TouchableOpacity  style={{flex:0, alignItems:"center", paddingLeft:20}} onPress={ () =>
                      this.setState({ visibleModalGallery: 1 })}>
                  <Image
                    style={styles.buttonImageGellery}
                    source={require('../../../assets/images/icon_picture.png')}
                  />
                            <Text style={styles.infoDetail}>Galleria</Text>
                </TouchableOpacity>

              </View>
              </View>}
             
            </View>
            <View style={styles.boxControlloRight}>
        
              {this.state?.dataArray?.length != 0 && this.state?.dataControlloArray?.length == 0 ?

                <ListProcedura list={this.state?.dataArray} callbackProcedura={this.callbackProcedura} />
                : undefined
              }
              {this.state?.dataControlloArray.length != 0 ?
                <View style={{ flex: 1}} >
                    
                  <ListControllo list={this.state?.dataControlloArray} callbackControllo = {this.callbackControllo} />
                    
                  <View style={styles.boxButtonSave} >
                    <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.returnProdocedura()}>
                      <Image
                        style={styles.ImagemButton}
                        source={require('../../../assets/images/arrow.png')}
                      />
                    </TouchableOpacity>
                    <View style={styles.boxButtonSave}>
                      <ButtonEsc callbackEsc={this.callbackEsc} />
                      <ButtonSave callbackSave={this.callbackSave} procedura={this.state?.dataControlloArray}  />
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


