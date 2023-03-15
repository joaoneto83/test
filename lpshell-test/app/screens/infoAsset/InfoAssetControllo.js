import React, { Component } from 'react';
import {  View,Text,map } from "react-native";
import Head from '../../../assets/utils/Head';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

import styles from "./styles";
import ButtonRadio from '../../../assets/utils/buttonBasi/ButtonRadio';
import ButtonControllo from '../../../assets/utils/buttonBasi/ButtonControllo';
import ButtonSave from '../../../assets/utils/buttonBasi/ButtonSave';
import ButtonEsc from '../../../assets/utils/buttonBasi/ButtonEsc';



const baseURLGet = " http://192.168.248.20:6090/api/assets/asset/QR/";


export default class InfoAssetDetail extends Component {
   
    constructor(props){ 
    
        super(props);  
    
        this.state = {  
            data:  {attributes:[]},
            qrCode: this.props.route.params.value,
     
         } 
         this.getData();
      }  
    
      getData = async () => {
        this.state = {  
            data:  await AsyncStorage.getItem('DATA_KEY').then((response) => {return response}),
            qrCode: this.props.route.params.value
         } 
        console.log("t", this.state, this.props.route.params.value)
        await axios.get(baseURLGet + this.state.qrCode.replace(/%/g,''), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
              'Authorization': `Bearer ${this.state.data.replace(/"/g,'')}`,
          } }
          )
        .then((response) => {
          console.log("qrCode",response.data)
        this.setState({  
            data:  response.data,
         } )
         console.log("state",this.state.data.attributes[0].value)
        });
     }


  render () {
    return (

      <View style={styles.container}>
        <Head prop = {this.props} route = "InfoAsset" title ="Info Asset"  ></Head>

        <View style={styles.boxDetail}>
 
          <View >
          <View style={styles.boxInfo}>
                        <Text style={styles.label}>Descrizione -</Text>
                        <Text style={styles.info}>{this.state.data.description}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Marca -</Text>
                        <Text style={styles.info}>{this.state.data.factory}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Numero - </Text>
                        <Text style={styles.info}> {this.state.data.keyNum}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Anno di produzione - </Text>
                        <Text style={styles.info}> {this.state.data.productionYear}</Text>
                    </View>
                    <View style={styles.boxInfo}>
                        <Text style={styles.label}>Matricola -</Text>
                        <Text style={styles.info}>{this.state.data.register}</Text>
                    </View>
                    {this.state.data.attributes.map((item) => (
                        <View style={styles.boxInfo}>
                            <Text style={styles.label}>{item.attribute.description} - </Text>
                            <Text style={styles.info}> {item.value}</Text>
                        </View>
                    ))}
            {/* todo 
            <View style={styles.boxInfo}>
            <Text style={styles.label}>Manutenzione -</Text>
            <Text style={styles.info}>{this.state.data.maintenanceFrequence}</Text>
            </View> */}
        </View>
       
        <View style={styles.boxButton}>
        <ButtonControllo  routes={"Giusto"} ></ButtonControllo>
        {this.state.data.attributes.map((item) => (
        <ButtonRadio  routes={true} ></ButtonRadio>
        ))}
        </View>
        <View style={styles.boxButtonSave} >
          <ButtonEsc/>
          <ButtonSave/>
        </View>
        </View>
      </View>
      
    );

  }
  
};
