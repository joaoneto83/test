import React, {Component} from "react";
import {Text, View,TouchableOpacity, Image } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import * as FileSystem from 'expo-file-system';

import Head from '../../../components/Head';
import Connected from '../../../assets/connected'; 
import Styles from "./styles";
import Moment from 'moment';
import LoadingInline from "../../../components/loading/loadingInline";
import ButtonSave from "../../../components/buttons/ButtonSave";
import DownloadPdf from "../../../assets/download-off-line/downloadPdf"
import Search from "../../../components/search/searchs"

import {api } from '../../../services/api_base';


const baseUrlMissioni = "Api/Mission/MyMissions"
const missioniOff = "Api/Mission/AllMissionDetails/"
const gifDir = FileSystem.cacheDirectory + 'giphy/';

const self = this

export default class Missioni extends Component {
    constructor(props){
         
        super(props)
        this.state = {
            backData: [...this.data],
            Authorization: "",
            loading: true,
            visibleModal: null,
            visibleModalAdvanced:null,
            isConnected: null,
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

    this.state = {
      Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
    }


    const getInfoAsync = await FileSystem.getInfoAsync(gifDir)

     if (getInfoAsync.exists) {
      await FileSystem.deleteAsync(gifDir);
      console.log("file",await FileSystem.getInfoAsync(gifDir))
     }
      await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
      console.log("file",await FileSystem.getInfoAsync(gifDir))

    await api.get( baseUrlMissioni)
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
  

    this.setState (
      {
        loading:true,
        Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
 
      }
    ) 
    console.log("off", id, name, this.state.loading, this.state.Authorization)

    await api.get( missioniOff + id)
      .then((response) => {
        console.log("off-ok", response.data)
        self.data = response.data;
        self.documents = response.data.documents
    
         AsyncStorage.setItem('Offline_Data', JSON.stringify(response.data.documents));
       this.setState( { visibleModal: 1,offLineId: id, offLineName:name, loading:false} );
      } ).catch((erro)=>{
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
    this.props.navigation.navigate("MissioniDetail", {data: self.data, offline:true})
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
  _renderModalContentAdvanced = () => (
    <View style={{ justifyContent:"center", backgroundColor:"white", padding:10}}>
      <View style={{alignItems:"center"}} >
      {this._renderButton('Close', () => this.setState({ visibleModalAdvanced: null }))}
      
      <Search fields={[{field:"Nome Missione", value:"description"}, {field:"Iniziata", value:"creationTime"}]} data={[...this.data]}   advancedSearch = {this.advancedSearch} /> 

      </View>
    </View>
  );
   goDetail = (id) => {
    this.props.navigation.navigate('MissioniDetail', {id:id});
   }
   handleForceupdateMethod() {
    this.backData = [];
   };
   callbackisConnected = (item) => {
    this.setState({
      isConnected: item
      } )
  } 
   search = (value) => {
    let filterData = [...this.data];
    this.setState({
        backData: filterData.filter( x => {
            return x.description.toLowerCase().indexOf(value.toLowerCase()) > -1 || Moment(x.creationTime).format('DD/MM/YYYY').toLowerCase().indexOf(value.toLowerCase()) > -1
        } )
    })
   }

   advancedSearch = (data) =>{
    this.setState(
      {
        backData: data
      }
    )
   } 

   getAdancedSearch = (value)=> {
    this.setState(
      {
        visibleModalAdvanced: value
      }
    )
   }
    render(){
        return (
            <View  >
            <Modal     isVisible={this.state.visibleModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
            </Modal>
            <Modal     isVisible={this.state.visibleModalAdvanced === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContentAdvanced()}
            </Modal>
            <Connected  callbackisConnected = {this.callbackisConnected}></Connected>
              <Head prop = {this.props} routes = "Mission" title ="Missioni"  search ="true" adancedSearch= { this.getAdancedSearch}  screem= {this.props.route.params?.screem} getSearch = {this.search}  />
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
            { this.state.backData?.map((item) => (
              <View style={Styles.DataTableHeaderHome} key={item?.id}>
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