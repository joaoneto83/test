import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonEsc() {
  const getESC = () =>{
    //to do
    console.log("esc" )
   }
      return (
          <TouchableOpacity   onPress={() => getESC()}  >
            <Text style={styles.esc}> ESC</Text> 
          </TouchableOpacity>
      );
  };

  export default ButtonEsc;