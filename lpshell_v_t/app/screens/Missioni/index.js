import React, {Component} from "react";
import {Text, View,TouchableOpacity } from "react-native";

import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

import Head from '../../../components/Head';
import Styles from "./styles";
import Moment from 'moment';

const baseUrlMissioni = "http://192.168.248.20:8090/Api/Mission/MyMissions"

export default class Missioni extends Component {

    constructor(props){
        super(props)
        this.state = {
            backData: [...this.data],
            Authorization: "",
        }
        this.getData();
    }

   data = [ ];
   getData = async () => {

    this.state = {
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
    }
   
    await axios.get( baseUrlMissioni, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
      }
    }
    )
      .then((response) => {
   
         this.data = response.data;
         this.setState({
            backData: [...this.data]
        })
         console.log("tes",this.data)
      }).catch((erro)=>{
        console.log("erro", erro)
      })
  }

   goDetail = (id) => {
    console.log("go")
    this.props.navigation.navigate('MissioniDetail', {id:id});
   }
   handleForceupdateMethod() {
    this.backData = [];
   };
   search = (value) => {
    let filterData = [...this.data];
    console.log("",filterData)
    this.setState({
        backData: filterData.filter( x => {
            return x.description.toLowerCase().indexOf(value.toLowerCase()) > -1 || Moment(x.creationTime).format('DD/MM/YYYY').toLowerCase().indexOf(value.toLowerCase()) > -1
        } )
    })
   }
    render(){
        return (
            <View>
              <Head prop = {this.props} routes = "Missioni" title ="Missioni" screem= {this.props.route.params?.screem} search = {this.search}  />
            <View style={Styles.DataTableHeader}>
             <Text style={Styles.headerLabel}>Nome Missione</Text>
             <Text style={Styles.headerLabel}>Iniziata il</Text>
             <Text style={Styles.headerLabel}>Assegnata</Text>
            </View>
       
            { this.state.backData.map((item) => (
                <TouchableOpacity style={Styles.DatacTableRow} onPress={()=> this.goDetail(item?.id)}>
                <Text style={Styles.rowLabel}>{item?.description}</Text>
                <Text style={Styles.rowLabel}> {Moment(item?.creationTime).format('DD/MM/YYYY')}</Text>
                <Text style={Styles.rowLabel}>{item?.assignedUser}</Text>
               </TouchableOpacity>
            )
            )       
            } 
            </View>
        )
    }

}
