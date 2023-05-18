import React , { Component }  from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {View,ImageBackground, StatusBar, TouchableOpacity, Image, Text } from 'react-native';


import styles from './stylesModal'
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal'; 

export default class Connected extends Component {
   
    visibleModal = 0;
    isConnected = null;
    affet = 0
   
  constructor(props) {
    super(props);
     this.state = {

      visibleModal: this.visibleModal,
      isConnected : this.isConnected
     };
      }

      connected = async (state) => {
        AsyncStorage.setItem('isConnected', JSON.stringify(state));
        let tes= await AsyncStorage.getItem('isConnected').then((response) => { return JSON.parse(response) })
        console.log("tst", tes)
      }

    
        
  unsubscribe = NetInfo.addEventListener(
    state => {
     if(this.props.callbackisConnected){
            this.props.callbackisConnected(state.isConnected)
        }
        this.connected(state.isConnected)
    if (this.affet == 3) {
        console.log('Connectio', this.affet);
        this.visibleModal= 1,
        this.isConnected = state.isConnected
     
        this.setState({
          visibleModal: this.visibleModal,
          isConnected : this.isConnected
        })
     
    }else {
     this.affet ++ ;
     console.log('Connectio', this.affet);
    }
   
  });
        _renderButton = (text, onPress) => (
            <TouchableOpacity  style={{width:"100%", alignItems:"flex-end"}} onPress={onPress}>
              <Image
                                style={styles.imagemClose}
                                source={require('../images/close.png')}
                              />
            </TouchableOpacity>
          );
        
          _renderModalContent = () => (
            <View style={{ justifyContent:"center", backgroundColor:"white", padding:10}}>
              <View style={{alignItems:"center"}} >
              {this._renderButton('Close', () => { this.setState({visibleModal: 0});    console.log(this.visibleModal) })}
              { this.isConnected ?
              <View>
                 <Image
                    resizeMode="contain"
              
                source={require('../images/online.png')}
              />
                 <Text style={styles.modalHeader}>On-line </Text> 
              </View>
               :
               <View>
                         <Image
                    resizeMode="contain"
               
                source={require('../images/offline.png')}
              />
               <Text style={styles.modalHeader}>Off-line </Text>
               </View>
                
              }
              </View>
            </View>
          );
        render() {
            return ( <View>
                {this.props.modal ? 
     <Modal  isVisible={this.state.visibleModal === 1}
     animationIn={'slideInLeft'}
     animationOut={'slideOutRight'}>
           {this._renderModalContent()}
   </Modal>: undefined
                }
     
            </View>
            );
          }

}

