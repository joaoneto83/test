import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonOk(props) {
  

 
      return (
          <TouchableOpacity onPress={() => props?.callbackOk()}  >
         
          
              <Text style={styles.save}>OK</Text> 
       
            
          </TouchableOpacity>
      );
  };

  export default ButtonOk;