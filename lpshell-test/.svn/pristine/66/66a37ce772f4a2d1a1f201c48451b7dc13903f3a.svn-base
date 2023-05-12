import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View,ImageBackground, StatusBar, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons }from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage'

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

//const baseURLPost = "http://192.168.248.20:6090/OIDC/connect/token";
const baseURLPost = "OIDC/connect/token";


export default class SignIn extends Component {
  // email: 'admin@logicapro',
  // password: 'L0g1caPr0!',

    // id :fc3babc0-7ea1-42f6-872b-c634adb76b91
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
      isConnected : this.isConnected
     };


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

      await apiStart
      .post( baseURLPost, loginData ,)
      .then((response) => {
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

      console.log("Home",apiStart,baseURLPost, await AsyncStorage.getItem('DATA_KEY').then((response) => {return response}))

  

    }
  };

  render() {
    return (

    <ImageBackground source={require('../../../assets/images/fundo.png')} style={{flex: 1, padding: 0}}> 
      <Container>
        <View style={{backgroundColor: 'rgba( 0, 0, 0, .6)', padding: 10 ,paddingHorizontal: 30, borderRadius: 10,  margin: 'auto'}}>
     
            <Connected  modal = "true"></Connected>
        <StatusBar hidden />
        <Logo source={require('../../../assets/images/logica_logo.png')} resizeMode="contain" style={{marginTop: -30}} />
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
          <ButtonText>Accedi</ButtonText>
        </Button>
        </View>
      </Container>
      </ImageBackground> 

    );
  }
}
