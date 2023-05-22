
import React, {Component} from "react";
import {Text, View,TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import * as FileSystem from 'expo-file-system';
import ButtonSave from "../../../components/buttons/ButtonSave";
import styles from "./styles";
import { api,apiStart,Authorization } from '../../../services/api_base';
import Connected from '../../../assets/connected'; 
import Moment from 'moment';

const baseUrlMissio = "Api/Mission/Mobile/"

const basePut = "/Api/ProcedureAsset/"
const diversoPost = "/Api/ProcedureAsset/"

export default class setMissioni extends Component {
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
      
    }



      


      callbackisConnected = async (item) => {
        this.setState({
          isConnected: item,
          mission: await AsyncStorage.getItem(this.props.id.toString()).then((response) => { return JSON.parse(response) }),
          } )
      } 


    render(){
        return (
            <View style={styles.DataTableHeaderHome} >
   
            <Connected  callbackisConnected = {this.callbackisConnected}></Connected>
            <TouchableOpacity disabled={this.state.isConnected ? !this.state.isConnected : !this.state.mission  }  
            style={this.state.isConnected ?  {flexDirection:"row"} : this.state.mission ?  {flexDirection:"row"} : [{flexDirection:"row"},{ opacity:0.5 } ]  } 
            onPress={()=> this.props.missioniOff(this.props.id,this.props.description,this.state.mission)}>

                <Text style={styles.boxTableBody}>{this.props.description}</Text>
                <Text style={styles.boxTableBody}> {Moment(this.props?.creationTime).format('DD/MM/YYYY')}</Text>
                <Text style={styles.boxTableBody}>{this.props?.assignedUser}</Text>
               </TouchableOpacity>

               {/* <TouchableOpacity disabled={!this.state.isConnected}  style={this.state.isConnected  ?  styles.boxTableBody :  [ styles.boxTableBody,{ opacity:0.5 } ]  }    onPress={() => this.props.missioniOff(this.props.id,this.props.description, this.state.mission  ) } >
                                      <Image
                                            resizeMode="contain"
                                            style={[styles.iconRow]}
                                            source={require('../../../assets/images/download.png')}
                                        />
              </TouchableOpacity> */}
        
            </View>
        )
 
    }
}