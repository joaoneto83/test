
import React, { useState, useEffect, useRef } from "react";
import{View, Text,Animated,StyleSheet,Easing,} from "react-native";



export default function LoadingBall() {

    const value = useRef(new Animated.Value(0.1));

    const animation = Animated.loop( 
        Animated.timing(value.current,{
        toValue: 1,
        useNativeDriver: true,

        duration: 4000,
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
            borderRadius:10,
            margin:5,
            width:10,
            height:10,
            transform: [
              {
                translateX: value.current.interpolate({
                  inputRange: [0, 0.2, 0.5,0.8, 1],
                  outputRange: [0, 10,300, 250,0],
                })
              },
            ],
          },
    
    })
    
    return (
      <View style={{ flexDirection:"row", alignItems:"center", }}>

<Animated.Text style={Styles.ball}/>
<Animated.Text style={Styles.ball}/>
<Animated.Text style={Styles.ball}/>


      </View>

   )
   
}

