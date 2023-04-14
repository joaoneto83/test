import  React, {Component} from "react";
import {View,ScrollView, Image, TouchableOpacity} from "react-native"
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'

import ListDocument from "../../../components/list/listDocument";
import LoadingInline from "../../../components/loading/loadingInline";

import Head from "../../../components/Head";

import styles from "./styles";

baseURLGet = "http://192.168.248.20:8090/Api/AttachedFiles/AssetDocuments/Mobile/"

export default class InfoDocument extends Component {

   constructor(props){

    super(props);
    this.state={
        Authorization: null,
        loading:true,
        data:[],
        listDocument:[]
    }
    this.getData();
   }

   getData  = async () =>{
    this.setState({ 
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
      loading:true
     })
     console.log("ok1",this.state)
    await axios.get(baseURLGet + this.props.route.params, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
        }
      }).then( (response)=>{
        console.log("response",response)
        this.setState({
            data: response.data,
            listDocument:response.data,
            loading:false
        })
      }
      )
      .catch(
        (erro)=>{
            console.log("errore",erro)
            this.setState({
                loading:false
            })
          }
      )

   }
   search = (value) => {
    let filterData = [...this.state.data];
    console.log("filter", filterData)
    this.setState({
        listDocument: filterData.filter(x => {
            return x.extension.toLowerCase().indexOf(value.toLowerCase()) > -1 || x.fileName.toLowerCase().indexOf(value.toLowerCase()) > -1
        })
    })
    }
    render() {
        return(
            <View style={{flex:1}}>
            <Head prop={this.props} routes="InfoAsset" title="Info Asset" screem="Document" search="true" getSearch={this.search} /> 
            { this.state.loading ? <LoadingInline/> : undefined  } 
            <ScrollView>
            <View style={styles.containerDocument} >
            <TouchableOpacity style={styles.boxImageArrow} onPress={()=>{ this.props.navigation.goBack(null)}}>
            <Image  resizeMode="contain" style={styles.imageArrow}
            source={require('../../../assets/images/arrow.png')}/>
            </TouchableOpacity>
             <ListDocument  list={this.state?.listDocument}/> 
            </View> 
            </ScrollView>
            </View>
        )

    }
}
