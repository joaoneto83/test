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





const baseURLGet = "http://192.168.248.20:6090/api/assets/asset/QR/";
const baseUrlGetControllo = "http://192.168.248.20:8090/Api/Procedure/Mobile/"
const basePost = "http://192.168.248.20:8090/Api/ProcedureAsset/Prova/"


export default class MissioniControllo extends Component { 

  off = false



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
    // procedureId: "",
    // assetId:"",
    // assetValue:[],
  }
   formData = new FormData();
  assetValueData = {
    procedureAttributeId:"",
    value:""
  }
  l

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

    
    console.log("callbackSalvett", this.formData)
     await axios.post(basePost +  this.props?.route?.params?.procedureId ,this.formData, {
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
      });
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
          this.state = {
            data: response.data,
          }
          this.setState({
            data: response.data,

              loading:false
           
          })
          this.postData.assetId = response.data?.id,
          console.log("p chamada", this.state)
        });
    }
 
  }
  getControllo = async (item) => {
    console.log("item", item)
   
  await axios.get(baseUrlGetControllo +  this.props?.route?.params?.procedureId, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
    }
  }
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
             
             
        <Head prop={this.props} route="Mission" title="Missioni" screem="controllo" ></Head>
        { this.state.loading ? <LoadingInline/> : undefined  } 
        <ScrollView>
          <View style={styles.containerControllo}>

            <View style={styles.boxControlloLeft}>
              { !this.state.expand ? 
              <View style={styles.boxFlex}>
              <Text style={styles.titleControllo}>Dettaglio</Text>
              <TouchableOpacity style={styles.BoxImagemButton} onPress={() => this.getExpand()}>
                      <Image
                        style={styles.imagemCheronI}
                        source={require('../../../assets/images/chevron.png')}
                      />
              </TouchableOpacity>
              </View>
              :<View>
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
                      <ButtonSave callbackSave={this.pickImage} procedura={this.state?.dataControlloArray}  />
                  </View>
                </View>
            </View>

          </View>
        </ScrollView>
      </View>

    );

  }

};


