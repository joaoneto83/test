
import React, {Component} from "react";
import {Text, View,TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import * as FileSystem from 'expo-file-system';
import ButtonSave from "../../../components/buttons/ButtonSave";
import styles from "./styles";
import axios from 'axios';
import {api, HeadersQR, HeadersBase ,URL, getURLBASE} from '../../../services/api_base';
import Connected from '../../../assets/connected'; 

const baseUrlMissio = "Api/Mission/Mobile/"

const basePut = "Api/Assets/ProcedureAsset/"
const diversoPost = "Api/Assets/ProcedureAsset/"

export default class UploadMission extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibleModal:null,
            data: null,
            procedureAssets:[],
            isConnected:  null,
            list:[],
            mission:null
        }
      this.lisUpload()
    }

    listSave=[];

    _renderButton = (text, onPress) => (
        <TouchableOpacity  style={{width:"100%", alignItems:"flex-end"}} onPress={onPress}>
          <Image
                            style={styles.imagemClose}
                            source={require('../../../assets/images/close.png')}
                          />
        </TouchableOpacity>
      );

    _renderModalContent = () => (
        <View style={{ justifyContent:"center", backgroundColor:"white", padding:10}}>
          <View style={{alignItems:"center"}} >
          {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
          <TouchableOpacity style={{flexDirection:"column", alignItems:"center"}} onPress={() => this.MissioniOff(this.state.offLineId)} >
            { this.listSave.map( (item)=> (
                <View>
                    { item.value == "save" ? 
                      <Text style={[styles.titleSave, {color: '#000000'}]} key={item.id}>Salvato con successo!</Text> :
                      <Text style={[styles.titleSave, {color: '#000000'}]}>Errore nel salvataggio </Text>
                    }
                </View>
                
            )
            ) 
            }
       
          </TouchableOpacity>
          </View>
        </View>
      );
      


    lisUpload = async () => {

       this.setState({
        mission : await AsyncStorage.getItem( "controllo" + this.props.id).then((response) => { return JSON.parse(response) })
       }) 
        console.log("mission 1", this.state.mission)
        if(this.state.mission == this.props.id){
           let dataOff= await AsyncStorage.getItem( this.props.id).then((response) => { return JSON.parse(response) })
            this.setState({
                       procedureAssets: dataOff.procedureAssets
              })
                this.state.procedureAssets.map((item)=>{
                  this.verificationUpload(item.procedureAssets, item?.statusId )
                   console.log("id",item.procedureAssets )
            })
      
            // await api.get(baseUrlMissio + this.props.id).then((response) => {
            //     console.log("response", response.data)
            //     this.setState({
            //         procedureAssets: response.data.procedureAssets
            //     })
               
            //     this.state.procedureAssets.map((item)=>{
            //          this .verificationUpload(item.id, item?.statusId )
            //         console.log("id",item.assetId,item.asset )
            //     })
    
            // }).catch((erro) => {
            //     console.log("erro", erro)
            // }
            // )
        }
    
    }

      verificationUpload = async (id,status) => {
   
        if ( await AsyncStorage.getItem(id.toString()) )
        {
            this.state.list.push( {
              id:id,
              data:  await AsyncStorage.getItem(id.toString()).then((response) => { return JSON.parse(response) }),
              status: status,
            }
               
                )
        }
        console.log("list", id,this.state.list)
       
      }

      saveListMission = async ()=>{
         console.log("     this.state.list",      this.state.list)
        this.state.list.map((item)=>{
            this.save(item.id, item.status, item.data)
        })
      }


      save = async (id, status,data) => {
        this.setState({ visibleModal : 1,
            loading:true})

         if (status == 1 || status == 2){
       
        await axios.post(await getURLBASE() + diversoPost , data, await HeadersBase()).then((response) => {
            this.listSave.push({id: id ,value:"save"})
            this.setState({ 
              loading:false,
             })
          console.log("ok1", response.status)
          AsyncStorage.removeItem(id)
          AsyncStorage.removeItem("Attribute"+id)
          console.log("async","Attribute"+id)
          if (this.listSave.length && this.state.list.length){
            AsyncStorage.removeItem("controllo" + this.props.id)
            this.setState({ 
                mission:null
               })
          }

        }).catch((error)=> {
          this.listSave.push({id: id ,value:"erro"})
            this.setState({
              loading:false,
            })
            console.log("ok2", status, error)
            AsyncStorage.removeItem(id)
            AsyncStorage.removeItem("Attribute"+id)
            console.log("async", AsyncStorage.removeItem("Attribute"+id))
            if (this.listSave.length && this.state.list.length){
              AsyncStorage.removeItem("controllo" + this.props.id)
              this.setState({ 
                  mission:null
                 })
            }
          });
     
         
          }else{

       await axios.put(await getURLBASE() +  basePut + id , data, await HeadersBase() ).then((response) => {
        this.listSave.push({id: id ,value:"save"})
            this.setState({ 
               loading:false
            })
         AsyncStorage.removeItem(id)
         AsyncStorage.removeItem("Attribute"+id)
         console.log("async","Attribute"+id)
          console.log("ok11", response.status)
          if (this.listSave.length && this.state.list.length){
            AsyncStorage.removeItem("controllo" + this.props.id)
            this.setState({ 
                mission:null
               })
          }
     
        }).catch((error)=> {
    
          console.log("ok21", status, error)
          this.listSave.push({id: id ,value:"erro"})
            this.setState({
            loading:false
            })
            AsyncStorage.removeItem(id)
            AsyncStorage.removeItem("Attribute"+id)
            console.log("async", AsyncStorage.removeItem("Attribute"+id))
            if (this.listSave.length && this.state.list.length){
              AsyncStorage.removeItem("controllo" + this.props.id)
              
              this.setState({ 
                  mission:null
                 })
            }
         });
         AsyncStorage.removeItem(id)
         if (this.listSave.length && this.state.list.length){
           AsyncStorage.removeItem("controllo" + this.props.id)
           this.setState({ 
               mission:null
              })
         }  
    
             }
      }
    
      callbackisConnected = (item) => {
        this.setState({
          isConnected: item
          } )
         
      } 


    render(){
        return (
            <View  >
            <Modal     isVisible={this.state.visibleModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
            </Modal>
            <Connected  callbackisConnected = {this.callbackisConnected}></Connected>
        { this.state.mission ?
    <TouchableOpacity style={ this.state.isConnected  ?  [styles.boxTableBody, { borderBottomWidth:0}] : [ styles.boxTableBody,{ opacity:0.3,borderBottomWidth:0 } ] }  onPress={() =>  this.state.isConnected  ? (this.saveListMission(), this.props.callbackSaveMissioni()): undefined } >
    <Image
        resizeMode="contain"
        style={styles.iconRow}
        source={require('../../../assets/images/upload.png')}
    />
</TouchableOpacity> :  
<TouchableOpacity style={styles.boxTableBodyOFF} >

</TouchableOpacity>
        }   

        
            </View>
        )
 
    }
}