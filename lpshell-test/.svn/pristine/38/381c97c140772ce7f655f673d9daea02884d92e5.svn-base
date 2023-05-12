import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonSave(props) {
  
  const getSave = () =>{
    console.log("ok" )
   }
 
      return (
          <TouchableOpacity onPress={() => props?.callbackSave()}  >
            { props.name ? 
              <Text style={styles.save}>{props.name}</Text> :
              <Text style={styles.save}>OK</Text> 
            }
            
          </TouchableOpacity>
      );
  };

  export default ButtonSave;