import React, {Component} from "react";
import {Text, View,TouchableOpacity, Image } from "react-native";

import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import * as FileSystem from 'expo-file-system';

import Head from '../../../components/Head';
import Styles from "./styles";
import Moment from 'moment';
import LoadingInline from "../../../components/loading/loadingInline";
import ButtonSave from "../../../components/buttons/ButtonSave";
import DownloadPdf from "../../../assets/download-off-line/downloadPdf"
import ListDocument from "../../../components/list/listDocument";
import ShowPdf from '../../../assets/download-off-line/showPdf';

const baseUrlMissioni = "http://192.168.248.20:8090/Api/Mission/MyMissions"
const missioniOff = "http://192.168.248.20:8090/Api/Mission/AllMissionDetails/"
const gifDir = FileSystem.cacheDirectory + 'giphy/';

export default class Missioni extends Component {
    constructor(props){
        super(props)
        this.state = {
            backData: [...this.data],
            Authorization: "",
            loading: true,
            visibleModal: null,
            offLineId:"",
            offLineName:""
        }
        this.getData();
    }
     data = [];
     documents=[];
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
    const getInfoAsync = await FileSystem.getInfoAsync(gifDir)
   
     if (getInfoAsync.exists) {
      await FileSystem.deleteAsync(gifDir);
      console.log("file",await FileSystem.getInfoAsync(gifDir))
     }
   
      await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });

   
      console.log("file",await FileSystem.getInfoAsync(gifDir))


   // test ShowPdf("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540jneto83%252Flpshell-test/giphy/ProvaMobile.pdf")
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
            backData: [...this.data],
            loading:false
        })
 
      }).catch((erro)=>{
        console.log("erro", erro)
      })
  }
  MissioniOff = async (id, name) => {
    this.state = {
      loading:true,
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
    }
    await axios.get( missioniOff + id, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${this.state.Authorization.replace(/"/g, '')}`,
      }
    }
    )
      .then((response) => {
       this.data = response.data;
       console.log("off", response.data)
       this.documents = response.data.documents,
       AsyncStorage.setItem('Offline_Data', JSON.stringify(response.data.documents));
      this.setState({ visibleModal: 1, offLineId: id, offLineName:name, loading:false,})
         
      }).catch((erro)=>{
        console.log("erro", erro)
      })
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity  style={{width:"100%", alignItems:"flex-end"}} onPress={onPress}>
      <Image
                        style={Styles.imagemClose}
                        source={require('../../../assets/images/close.png')}
                      />
    </TouchableOpacity>
  );


  callbackSave = () =>
  {
    this.setState({ visibleModal: null })
    this.props.navigation.navigate("MissioniDetail", {data: this.data, offline:true})
  }

  _renderModalContent = () => (
    <View style={{ justifyContent:"center", backgroundColor:"white", padding:10}}>
      <View style={{alignItems:"center"}} >
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
      <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={() => this.MissioniOff(this.state.offLineId)} >
        <Text style={Styles.modalHeader}>scaricato con successo la missione: {this.state.offLineName}, modalità off-line. </Text>
        <ButtonSave  callbackSave= {this.callbackSave}></ButtonSave>
      </TouchableOpacity>
      </View>
    </View>
  );
   goDetail = (id) => {
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
            <Modal     isVisible={this.state.visibleModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
            </Modal>

              <Head prop = {this.props} routes = "Mission" title ="Missioni"  search ="true" screem= {this.props.route.params?.screem} getSearch = {this.search}  />
             { this.state.loading ? <LoadingInline/> : undefined  } 
             {   this.documents ?  
             <View>     
           <DownloadPdf documents = {this.documents} gifDir = {gifDir} /> 
            
             </View>
         
              : undefined
              }
            <View style={Styles.DataTableHeaderHome}>
            <View style={{flexDirection:"row"}}>
            <Text style={Styles.boxTableHeader}>Nome Missione</Text>
             <Text style={Styles.boxTableHeader}>Iniziata il</Text>
             <Text style={Styles.boxTableHeader}>Assegnata</Text>
            </View>
             <View>
             <Text style={Styles.boxTableHeader}>Off-line</Text>
             </View>
            </View>
            { this.state.backData.map((item) => (
              <View style={Styles.DataTableHeaderHome}>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={()=> this.goDetail(item?.id)}>
                <Text style={Styles.boxTableBody}>{item?.description}</Text>
                <Text style={Styles.boxTableBody}> {Moment(item?.creationTime).format('DD/MM/YYYY')}</Text>
                <Text style={Styles.boxTableBody}>{item?.assignedUser}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={Styles.boxTableBody} onPress={() => this.MissioniOff(item?.id,item?.description ) } >
                                      <Image
                                            resizeMode="contain"
                                            style={[Styles.iconRow]}
                                            source={require('../../../assets/images/download.png')}
                                        />
              </TouchableOpacity>
               </View>
            )
            )       
            } 
            </View>
        )
    }

}