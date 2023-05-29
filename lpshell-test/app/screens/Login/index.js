import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View,ImageBackground, StatusBar, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons }from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import LoadingInline from "../../../components/loading/loadingInline";
import Modal from 'react-native-modal';


import Connected from '../../../assets/connected'; 


import { getAuthorization, apiStart } from '../../../services/api_base';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
} from './styles';


const baseURLPost = "OIDC/connect/token";


export default class SignIn extends Component {
  // email: 'admin@logicapro',
  // password: 'L0g1caPr0!',

    visibleModal = 0;
    isConnected = null;
    affet = 0
   
  constructor(props) {
    super(props);
     this.state = {
      email: 'admin@logicapro',
      password: 'L0g1caPr0!',
      error: '',
      hidepass:true,
      visibleModal: this.visibleModal,
      isConnected : this.isConnected,
      visibleModalSave: null,
      URL_NEW: '',
     };

    this.storage()
  }

  static navigationOptions = {
    header: null,
  };


  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };
   storage = async ()=> {
     if (await AsyncStorage.getItem('URL_NEW')){
      this.setState({ URL_NEW : await AsyncStorage.getItem('URL_NEW').then((response) => { return JSON.parse(response)})})

     }
     console.log("memoryURL", this.state.URL_NEW)
    
   }
  

  //  createPost() {
  //   axios.post(baseURLPost, {
  //       title: "test",
  //       body: "test"
  //     })
  //     .then((response) => {
  //       try {
     
  //         if (type === "success") {
  //           navigation.navigate("Home", { user });
  //         }
  //       } catch (error) {
  //         console.error("error with login", error);
  //       }
  //       setPost(response.data);
  //     });
  // }


  handleUrlChange = (URL_NEW) => {
    this.setState({ URL_NEW });
  };




  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
  
    //return this.props.navigation.navigate("Home");
    if (this.state.email === 'config' && this.state.password === 'config'){
      console.log("a",this.state.email)
      return this.setState(
        {
          visibleModalSave: 1
        }
      )
    }

    if (this.state.email?.length === 0 ) {
     
       this.setState({ error: 'Inserisci username' }, () => false);
    } 
    else if(this.state.password?.length === 0){
      this.setState({ error: 'Inserisci password ' }, () => false);
    }
    else {
    const loginData = ({
      grant_type:'password',
      username: this.state.email,
      password: this.state.password,
      scope: "openid profile LogicaProBaseAPI LogicaProIdentity STAssetsAPI",
      client_id: 'LPShell',
      client_secret: '051702A3-80B2-42AE-99C2-15D6D85425BD',
    })

     if(await AsyncStorage.getItem('URL_NEW')){
      console.log("tat", loginData )
      await  axios.post(this.state.URL_NEW + baseURLPost, loginData,
        {
          headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }
        ).then((response) => {
        AsyncStorage.setItem('DATA_KEY', JSON.stringify(response.data.access_token));
        this.state = {
         Authorization:  AsyncStorage.getItem('DATA_KEY').then((response) => { return response.replace(/"/g, '') }),
       }

       getAuthorization(this.state.Authorization)
         this.props.navigation.navigate("Home", { user: response.data });
             
       }).catch(
         (erro)=>{
             console.log("errore",erro)
             this.setState({
                 loading:false
             })
           }
       )
       
     }
    //  else{
    //   console.log("sem", loginData )
    //   await apiStart
    //   .post( baseURLPost , loginData ,)
    //   .then((response) => {
    //    AsyncStorage.setItem('DATA_KEY', JSON.stringify(response.data.access_token));
    //    this.state = {
    //     Authorization:  AsyncStorage.getItem('DATA_KEY').then((response) => { return response.replace(/"/g, '') }),
    //   }
    //   getAuthorization(this.state.Authorization)
    //     this.props.navigation.navigate("Home", { user: response.data });
            
    //   }).catch(
    //     (erro)=>{
    //         console.log("errore",erro)
    //         this.setState({
    //             loading:false
    //         })
    //       }
    //   )
    //  }
    }
  };
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <Image
                       resizeMode="contain"
                       style={{width:30}}
                       source={require('../../../assets/images/close.png')}
                      />
    </TouchableOpacity>
  );
  _renderModalContent = () => (
    <View >
      <View style={{flex:0, flexDirection:"row-reverse", alignItems:"center", justifyContent:"space-around", paddingVertical:20}}> 
      {this._renderButton('Close', () => this.setState({ visibleModalSave: null }))}
      <Text style={{color:"#fff", fontSize:26}}>Configurazione</Text>
      </View>


      <View style={{flexDirection:"row", justifyContent:"center",  alignContent:"center"}}>
      <Input
          placeholder="URL"
          value={this.state.URL_NEW}
          onChangeText={this.handleUrlChange}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ width:200}}
        />
          <Button onPress={this.saveURL}>
          <ButtonText style={{ backgroundColor: "#E4A83B",borderRadius: 5, padding:5}}>Accedi</ButtonText>
        </Button>
        <Button onPress={this.deleteURL}>
          <ButtonText  style={{ backgroundColor: "#F35330",borderRadius: 5, padding:5}}>Delete</ButtonText>
        </Button>
      
      </View>
      
    </View>
    
  );

  saveURL = async () => {
    await AsyncStorage.setItem('URL_NEW', JSON.stringify(this.state.URL_NEW));
  }
  
  deleteURL = async () => {
    if(await AsyncStorage.getItem('URL_NEW') ){
      await AsyncStorage.removeItem('URL_NEW');
      this.setState({
        URL_NEW : ""
      })
    }

  }


  render() {
    return (

    <ImageBackground source={require('../../../assets/images/fundo.png')} style={{flex: 1, padding: 0}}> 
      <Container>
      <Modal     isVisible={this.state.visibleModalSave === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}>
                    {this._renderModalContent()}
            </Modal>
        <View style={{backgroundColor: 'rgba( 0, 0, 0, .6)', padding: 10 ,paddingHorizontal: 30, borderRadius: 10,  margin: 'auto'}}>
     
            <Connected  modal = "true"></Connected>
        <StatusBar hidden />
        <Logo source={require('../../../assets/images/logica_logo.png')} resizeMode="contain" style={{marginTop: -30, width:200}} />
        <Input
          placeholder="Utente"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ width:200}}
        />
        <View style={{ flex:0, flexDirection: "row"}}>
        <Input
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={this.state.hidepass}
          style={{ width:200}}
        />
        <TouchableOpacity  style={{ marginLeft: -50}} onPress = {()=>  this.setState({ hidepass: !this.state.hidepass })}>

    { this.state.hidepass ? <Ionicons name="eye-off"  size={25} style={{ color: '#787777'}} />
    :
    <Ionicons name="eye"  size={25}  style={{ color: '#787777'}}/>
    } 
        </TouchableOpacity>
 
        </View>
  
        {this.state.error.length !== 0 && <ErrorMessage style={{ width:200, paddingLeft:10 }}>{this.state.error}</ErrorMessage>} 
        <Button onPress={this.handleSignInPress}>
          <ButtonText style={{ backgroundColor: "#E4A83B",  borderRadius: 5, paddingVertical:5}}>Accedi</ButtonText>
        </Button>
        </View>
      </Container>
      </ImageBackground> 

    );
  }
}
