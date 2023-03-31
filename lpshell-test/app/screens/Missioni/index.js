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
     data = []
  //  data = [
  //   {
  //     "id": "6739d643-20f5-494b-8873-0007a0010e36",
  //     "description": "GoodMissione",
  //     "creationTime": "2023-03-27T09:41:19.3825809",
  //     "creationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "modificationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "modificationTime": "2023-03-27T09:41:19.3826843",
  //     "statusId": 2,
  //     "errors": 0,
  //     "assignedUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "assignedUser": "ADMIN@LOGICAPRO",
  //     "lastExecutionUserId": "b8101b01-95a2-43fd-9be2-002ec0382658",
  //     "lastExecutionTime": "2023-03-27T12:52:40.554922",
  //     "totalTasks": 1,
  //     "completedTasks": 1
  //   },
  //   {
  //     "id": "d81401cd-9ff8-4fde-8f18-9dca8f8b5ff8",
  //     "description": "PerJoao",
  //     "creationTime": "2023-03-24T07:57:01.6845391",
  //     "creationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "modificationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "modificationTime": "2023-03-24T07:57:01.6845691",
  //     "statusId": 2,
  //     "errors": 1,
  //     "assignedUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "assignedUser": "ADMIN@LOGICAPRO",
  //     "lastExecutionUserId": "b8101b01-95a2-43fd-9be2-002ec0382658",
  //     "lastExecutionTime": "2023-03-27T12:53:22.4917673",
  //     "totalTasks": 3,
  //     "completedTasks": 2
  //   },
  //   {
  //     "id": "4aba92fb-7d84-4f29-9ae0-fed0a0ecf2f7",
  //     "description": "BadMission",
  //     "creationTime": "2023-03-27T08:44:06.5554182",
  //     "creationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "modificationUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "modificationTime": "2023-03-27T08:44:06.5555447",
  //     "statusId": 1,
  //     "errors": 1,
  //     "assignedUserId": "fc3babc0-7ea1-42f6-872b-c634adb76b91",
  //     "assignedUser": "ADMIN@LOGICAPRO",
  //     "lastExecutionUserId": "b8101b01-95a2-43fd-9be2-002ec0382658",
  //     "lastExecutionTime": "2023-03-27T12:53:52.9524054",
  //     "totalTasks": 2,
  //     "completedTasks": 0
  //   }
  //  ];
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
            <View >
              <Head prop = {this.props} routes = "Mission" title ="Missioni"  seach ="true" screem= {this.props.route.params?.screem} search = {this.search}  />
            <View style={Styles.DataTableHeaderHome}>
             <Text style={Styles.headerLabel}>Nome Missione</Text>
             <Text style={Styles.headerLabel}>Iniziata il</Text>
             <Text style={Styles.headerLabel}>Assegnata</Text>
            </View>
       
            { this.state.backData.map((item) => (
                <TouchableOpacity style={Styles.DatacTableRowHome} onPress={()=> this.goDetail(item?.id)}>
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
