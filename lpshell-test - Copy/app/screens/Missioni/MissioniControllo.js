import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,SafeAreaView } from "react-native";
import Head from '../../../components/Head';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';


import styles from "./styles";
import ButtonSave from '../../../components/buttons/ButtonSave';
import ButtonEsc from '../../../components/buttons/ButtonEsc';
import ListControllo from '../../../components/list/listControllo';
import Gallery from '../../../components/gallery';
import Photo from '../../../components/camera';
import LoadingInline from "../../../components/loading/loadingInline";
import ButtonDocument from '../../../components/buttons/buttonDocument';

import { api,apiStart,Authorization } from '../../../services/api_base';


const baseURLGet = "/api/assets/asset/QR/";
const baseUrlGetControllo = "/Api/Procedure/Mobile/"
const basePut = "/Api/ProcedureAsset/"
const diversoPost = "/Api/ProcedureAsset/"


export default class MissioniControllo extends Component { 

  off = false



  constructor(props) {

  super(props);
    this.state = {
      data:  [],
      asset:"",
      documents:[],
      dataArray: this.dataControllo,
      dataControlloArray: [],
      Authorization: "",
      qrCode: this.props.route.params.value,
      expand: true,
      visibleModal: null,
      visibleModalSave: null,
      visibleModalGallery:null,
      loading:true,
      statusId:null
    }
   

if (props.route.params?.offline) {

   this.getDataOff();
   } else {

      this.getData();
  }


  }

  postData= {
    // procedureId: "",
    // assetId:"",
    // assetValue:[],
  }
   formData = new FormData();
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
    this.postData.assetValue = {
    assetValue: this.state?.dataControlloArray?.attributes?.map( (data)=> 
    { 
      if (item.id == data.id) {
     
        x = {
          procedureAttributeId: item.id,
          value: item?.value?.toString()
          } 
         
          return x
        
      }else {
        x = {
          procedureAttributeId: data.id,
          value: data?.goodValue
          }
          return x
      }
       
   
     }),
     notes:"",
    }
     console.log("callbackProcedura ",   this.postData.assetValue)
  }

  callbackEsc = () => {
    console.log("callbackEsc")
  }

  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      console.log*
   
    this.formData.append("filename", photo);

    if (!result.canceled) {
        console.log("test",result.assets[0].uri);
        this.callbackSave()
    }
  };
  
  callbackSave = async () => {
    this.setState({ 
      visibleModal: null,
      visibleModalSave: 1,
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
      loading:true
     })

    console.log("callbackSalvett",this.props?.route?.params?.procedureAssets, this.postData.assetValue)

    if (this.state.statusId == 1 || this.state.statusId == 2){
     
     let postData = {
      missionId:  this.props?.route?.params?.mission.id || this.props?.route?.params?.mission,
      procedureId: this.props?.route?.params?.data?.procedureId,
      assetId: this.props?.route?.params?.assetId,
      notes: this.postData.assetValue.notes,
      assetValue: this.postData.assetValue.assetValue
     }
     console.log("oka", postData, this.state.statusId)

      await api.post(diversoPost, postData).then((response) => {
        this.setState({ 
          loading:false
         })
      console.log("ok", response.status)
    }).catch((error)=> {
      console.log("errore", error)
        this.setState({
          loading:false
        })
      });
    }else{
      console.log("ok", this.state.statusId)
      await api.put(basePut+ this.props?.route?.params?.procedureAssets , this.postData.assetValue).then((response) => {
        this.setState({ 
          loading:false
         })
      console.log("ok", response.status)
    }).catch((error)=> {
      console.log("errore", error)
        this.setState({
          loading:false
        })
      });
    }
 


  }

  getExpand = ()=>{
   
   this.setState({
       expand: !this.state.expand
    })

  }

  getDataOff = () => {
    console.log("off controllo",this.props.route.params.data.procedureData.attributes)
    this.state.asset =this.props.route.params?.data.asset;
    this.state.data =  this.props.route.params?.data;
    this.state.documents = this.props.route.params?.documnets;
    this.state.dataControlloArray = this.props.route.params?.data.procedureData;
    this.state.loading = false
  };

  getData = async () => {
    Authorization(baseURLGet)
    console.log("i", this.props?.route?.params?.data)
    if(this.off){
      this.setState({
        data: this.data,
      })
      this.getControllo(this.data?.id);
      console.log("off", this.state.data)
    }else{

      this.state = {
        qrCode: this.props.route.params.value,
        statusId:this.props?.route?.params?.data?.statusId
      }
      await apiStart.get(baseURLGet + this.state.qrCode.replace(/%/g, ''))
        .then((response) => {
          this.getControllo(response.data?.id);
          this.setState({
            data: response.data,
            documents: response.data.documents,
            asset:response.data.description,
              loading:false
          })
          this.postData.assetId = response.data?.id,
          console.log("p chamada", this.state)
        });
    }
 
  }

  getControllo = async (item) => {
    console.log("item", item)
   
  await api.get(baseUrlGetControllo +  this.props?.route?.params?.procedureId
  )
    .then((response) => {
    
      this.setState({
        dataControlloArray: response.data,
        loading:false
      })
      console.log("procedura missini", response.data)
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
     <Photo/>
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
        <Head prop={this.props} routes="Mission" title="Missioni" screem="controllo"  offline = {this.props.route.params?.offline}  />
        { this.state.loading ? <LoadingInline/> : undefined  } 
        <ScrollView>
          <View style={styles.containerControllo}>

            <View style={styles.boxControlloLeft}>
              { this.state.expand ? 
              <View style={styles.boxFlex}>
              <Text style={styles.titleControllo}>Dettaglio</Text>
              <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.getExpand()}>
                      <Image
                        style={styles.imagemCheronI}
                        source={require('../../../assets/images/chevron.png')}
                      />
              </TouchableOpacity>
              </View>
              :
              <View>
              <View style={styles.boxFlex}>
              <Text style={styles.titleControllo}>Dettaglio</Text>
              <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.getExpand()}>
                      <Image
                        style={styles.imagemChevron}
                        source={require('../../../assets/images/chevron.png')}
                      />
              </TouchableOpacity>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.labelControlloDetail}>Descrizione -</Text>
                <Text style={styles.infoDetail}>{this.state?.asset}</Text>
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
              <ButtonDocument prop = {this.props} routes = "Documents"  title ="Documents" documents= {this.state?.documents} id = {this.state.data?.id} ></ButtonDocument>
              <View style={styles.boxImageControllo}>
             

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Photo') }>
                  <Image
                    style={styles.boxImageControllo}
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
                <View style={{ flex: 1}} >
                  <ListControllo list={this.state?.dataControlloArray} callbackControllo = {this.callbackControllo} />     
                  <View style={styles.boxButtonSave} >
                      <ButtonEsc callbackEsc={this.callbackEsc} />
                      <ButtonSave callbackSave={this.callbackSave} procedura={this.state?.dataControlloArray}  />
                  </View>
                </View>
            </View>

          </View>
        </ScrollView>
      </View>

    );

  }

};


