
import React, { useState, useEffect, useRef } from "react";
import{View, Text,Animated,StyleSheet,Easing,} from "react-native";



export default function LoadingInline() {

    const value = useRef(new Animated.Value(0.1));

    const animation = Animated.loop( 
        Animated.timing(value.current,{
        toValue: 1,
        useNativeDriver: true,
    
        duration: 3000,
      }
      )

      
      )
      useEffect(()=> {
        animation.start()
      }
      )
      const Styles = StyleSheet.create({

        ball: {
            fontSize: 20,
            backgroundColor:"#E4A83B",
            marginLeft:-600,
            width:300,
            height:5,

            transform: [
              {
                translateX: value.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 2000],
                })
              },
            ],
          },
    
    })
    
    return (
<View style={{ flexDirection:"row", alignItems:"center",width:"100%",   height:5,backgroundColor:"#ECDCBE" }}>

<Animated.Text style={Styles.ball}/>



      </View>

   )
   
}

