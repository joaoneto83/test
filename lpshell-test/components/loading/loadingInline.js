
import React, { useState, useEffect, useRef } from "react";
import{View, Text} from "react-native";


export default function LoadingInline() {
    return (
      <View style={{width:600,height:20,backgroundColor:"yellow"}}>
           <View style={{width:100,height:20,backgroundColor:"red"}}>
         </View>
      </View>

   )
}