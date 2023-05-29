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
import UploadMission from "./uploadMission";
import SetMissioni from "./setMissioni";
import SetMissioniSave from "./setMissioniSave";

import {api} from '../../../services/api_base';

const baseUrlMissioni = "/Api/Assets/Mission/MyMissions"
const missioniOff = "/Api/Assets/Mission/AllMissionDetails/"
const gifDir = FileSystem.cacheDirectory + 'giphy/';

const self = this

export default class Missioni extends Component {
    constructor(props){
        super(props)
       
        this.state = {
            backData: [...this.data],
            Authorization: "",
            loading: false,
            visibleModal: null,
            visibleModalAdvanced:null,
            isConnected: null,
            offLineId:"",
            offLineName:"",
            memoriaMissionSalve:null,
            new:null,
            saveMissioni:true
        }
        this.missioniCache()
  
        
    }
     data = [];
     documents=[];
     saveMissioni=[];
    //  componentDidMount() {
    //   const { navigation } = this.props;
    //   this.focusListener = navigation.addListener('didFocus', () => {
    //    conosele.log("primeiro")
    //   });
    // }
  
    // componentWillUnmount() {
    //   // Remove o listener ao desmontar
    //   this.focusListener.remove();
    //   conosele.log("ultimo")
    // }


  missioniCache = async () => {
    this.setState({
      isConnected :await AsyncStorage.getItem('isConnected').then((response) => { return response }),
      loading:true
    } )
   
   

    if (this.state.isConnected == "false"){
      if (await AsyncStorage.getItem('missioni')){
        this.data = await AsyncStorage.getItem('missioni').then((response) => { return JSON.parse(response)})
        this.setState({
          backData : [...this.data ],
          loading:false
        } )
      
      }
      else {
        this.setState({
          loading:false
        }
        )
      }

    }


    
    this.getData();
  }
  
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
     

  if (this.data.length == 0){
    await api.get( baseUrlMissioni)
    .then((response) => {
       this.data = response.data;
       AsyncStorage.setItem('missioni', JSON.stringify(this.data));
       console.log("data",this.data)
       this.setState({
        backData: [...this.data],
        loading:false
    })
  


    }).catch((erro)=>{
      console.log("erro", erro)
    })

  }else {
    this.setState({
      loading:false
  })
  }

  this.state.backData.map(async(item)=>{
    console.log("e", item?.id)
    if (await AsyncStorage.getItem( "controllo" + item?.id)){
      console.log("oque", item?.id)
      this.setState({
        saveMissioni : false
      })
    }

  })
 
  }

  callbackSaveMissioni = () => {
    this.setState({
      saveMissioni : true
    })
  }


  MissioniOff = async (id, name, mission) => {

    this.setState (
      {
        loading:true,
        Authorization: await AsyncStorage.getItem('DATA_KEY').then((response) => { return response }),
      }
    ) 
    console.log("off", id, name, this.state.loading, this.state.Authorization)
if (this.state.isConnected == "true"){
  await api.get( missioniOff + id)
  .then((response) => {
    this.DataOff(response.data)
    
   
   // AsyncStorage.setItem('Offline_Data', JSON.stringify(response.data.documents));

   this.setState( { offLineId: id, offLineName:name, loading:false} );
   this.callbackSave()
  } ).catch((erro)=>{
    console.log("erro", erro)
  })
}else {
  this.callbackOff(mission)
  if (await AsyncStorage.getItem(id)){
    self.data =  AsyncStorage.setItem( id, JSON.stringify(response.data));
  }
}
  }

  
  DataOff = async (data) =>{
    let n = 0;
   let procedureAssetsOFF = data.procedureAssets.map((item)=>{
      x = {
        procedureAssets:  item.id,
        procedure : item.procedure,
        asset: item.asset,
        statusId: item.statusId
      }
      return x
    } 
    )

    let dataOFF = {
      id: data.id,
      description: data.description,
      assignedUserId: data.assignedUserId,
      totalTasks: data.totalTasks,
      completedTasks: data.completedTasks,
      procedureAssets: procedureAssetsOFF,
      documents: data.documents
    }

    self.data = dataOFF;
    self.documents = dataOFF.documents;
   AsyncStorage.setItem( data.id, JSON.stringify(dataOFF));
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity  style={{width:"100%", alignItems:"flex-end"}} onPress={onPress}>
      <Image
                        style={Styles.imagemClose}
                        source={require('../../../assets/images/close.png')}
                      />
    </TouchableOpacity>
  );

  callbackOff = (mission) =>
  {
    this.setState({ visibleModal: null, loading:false})
    this.props.navigation.navigate("MissioniDetail", {data: mission, offline:true})
  }
  callbackSave = () =>
  {
    this.setState({ visibleModal: null , loading:false})
    this.props.navigation.navigate("MissioniDetail", {data: self.data, offline:true})
  }

  _renderModalContent = () => (
    <View style={{ justifyContent:"center", backgroundColor:"white", padding:10}}>
      <View style={{alignItems:"center"}} >
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
      <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={() => this.MissioniOff(this.state.offLineId)} >
        <Text style={Styles.modalHeader}>scaricato con successo la missione: {this.state.offLineName}</Text>
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
    console.log("conect0", this.state.isConnected)
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
              <Head prop = {this.props}
                missioniCache = {this.missioniCache}
                routes = "Mission" 
                title ="Missioni" 
                search ="true" adancedSearch= { this.getAdancedSearch}  
                screem= {this.props.route.params?.screem}
                getSearch = {this.search}  />
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
          
             {/* <Text style={Styles.boxTableHeader}>Off-line</Text> */}
           
           
             <Text style={Styles.boxTableHeader}>Carica</Text>
             </View>
            </View>
            { this.state.backData?.map((item) => (
              <View style={Styles.DataTableHeaderHome} key={item?.id}>
             { this.state.saveMissioni ?  <SetMissioni saveMissioni={this.state.saveMissioni} id={item?.id} description={item?.description} missioniOff={this.MissioniOff}  goDetail= {this.goDetail} />:
               <SetMissioniSave saveMissioni={false} id={item?.id} description={item?.description} missioniOff={this.MissioniOff}  goDetail= {this.goDetail} />
             }
             
              <UploadMission id={item.id} callbackSaveMissioni = {this.callbackSaveMissioni} />
               </View>
            )
            )       
            } 
            </View>
        )
    }

}