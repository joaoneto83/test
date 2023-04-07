import React, { Component } from 'react';
import {  View,Text,map } from "react-native";
import Head from '../../../components/Head';
import ButtonBasi from '../../../components/buttons/buttonBasi'
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'

import styles from "./styles";

import LoadingInline from "../../../components/loading/loadingInline";

const baseURLGet = " http://192.168.248.20:6090/api/assets/asset/QR/";


export default class InfoAssetDetail extends Component {

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
   
    constructor(props){ 
    
        super(props);  
    
        this.state = {  
            data:  {},
            Authorization:{},
            qrCode: this.props.route.params.value,
            loading:true
     
         } 
        
         this.getData();
      }  
    
      getData = async () => {

      
        this.state = {  
          Authorization:  await AsyncStorage.getItem('DATA_KEY').then((response) => {return response}),
          qrCode: this.props.route.params.value
       } 
      console.log("t", this.state, this.props.route.params.value)
      await axios.get(baseURLGet + this.state.qrCode.replace(/%/g,''), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': `Bearer ${this.state.Authorization.replace(/"/g,'')}`,
        } }
        )
      .then((response) => {
        console.log("qrCode",response.data)
        this.state = {  
          data:  response.data,
        }
      this.setState({  
          data:  response.data,
          loading: false
        
       } )
       console.log("state",this.state.data)
       console.log("state",this.state.data.attributes)
      });
       

   
     }


  render () {
    return (

      <View style={styles.container}>
        <Head prop = {this.props} routes = "InfoAsset" title ="Info Asset"  ></Head>
        { this.state.loading ? <LoadingInline/> : undefined  } 
        <View style={styles.boxDetail}>
                <View >
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Descrizione -</Text>
                        <Text style={styles.info}>{this.state.data?.description}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Marca -</Text>
                        <Text style={styles.info}>{this.state.data?.factory}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Numero - </Text>
                        <Text style={styles.info}> {this.state.data?.keyNum}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Anno di produzione - </Text>
                        <Text style={styles.info}> {this.state.data?.productionYear}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Matricola -</Text>
                        <Text style={styles.info}>{this.state.data?.register}</Text>
                    </View>
                    {this.state?.data?.attributes?.map((item) => (
                        <View style={styles.boxInfo}>
                            <Text style={styles.label}>{item.attribute?.description} - </Text>
                            <Text style={styles.info}> {item.value}</Text>
                        </View>
                    ))}
                         {/* todo <View style={styles.boxInfo}>
            <Text style={styles.label}>Revisione -</Text>
            <Text style={styles.info}>{this.state.data.revisionFrequence}</Text>
            </View>
            <View style={styles.boxInfo}>
            <Text style={styles.label}>Manutenzione -</Text>
            <Text style={styles.info}>{this.state.data.maintenanceFrequence}</Text>
            </View> */}
                </View>
  
        <View style={styles.boxButton}>
        <ButtonBasi prop = {this.props} routes = "Document"  title ="Document" ></ButtonBasi>
        <ButtonBasi prop = {this.props} routes = "Mappa" title ="Mappa" ></ButtonBasi>
        <ButtonBasi prop = {this.props} routes = "Controllo" title ="Controllo" qrCodes = {this.state.data.qrCodes}></ButtonBasi>
        </View>
    
        </View>
      </View>
      
    );

  }
  
};
