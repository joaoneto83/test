import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Image } from "react-native";
import styles from "./styles";

export default class QrcodeScreen extends Component {

    constructor(props){
        super(props)
     console.log("qr", props)
    }

    render(){
        return (
            <View style={styles.boxHome}>
            { this.props.data.route.params?.item ? 
            <TouchableOpacity style={styles.buttonScanSecund}  onPress = {()=>  this.props.scan()}  >
                   <Image
                      resizeMode="contain"
             style={styles.buttonImageIconStyleSecund}
                  source={require('../../assets/images/qrcode.png')}
                />
                <Image
                   resizeMode="contain"
             style={styles.check}
                  source={require('../../assets/images/check.png')}
                />
              </TouchableOpacity>: undefined}
            <TouchableOpacity style={styles.buttonScan}  onPress = {()=>  this.props.scan()}  >
                <Image
                 resizeMode="contain"
             style={styles.buttonImageIconStyle}
                  source={require('../../assets/images/qrcode.png')}
                />
                <View style={styles.boxInfo}> 
                <Text style={styles.textQr}>Scan QR code</Text>
                <Text style={styles.textItem}>{this.props.data.route.params?.item}</Text>
                </View>
                 
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCamera}  onPress = {()=>  this.props.scan()}  >
                <Image
             style={styles.buttonImageStyle}
                  source={require('../../assets/images/camera.png')}
                />
              </TouchableOpacity>
            </View>
        )
    }

} 