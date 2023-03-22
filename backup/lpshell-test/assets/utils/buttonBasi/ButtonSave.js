import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonSave() {



  const getSave = () =>{
    //to do
    console.log("ok" )
   }
 
 
      return (
      

          <TouchableOpacity onPress={() => getSave()}  >
            <Text style={styles.save}> OK</Text> 
          </TouchableOpacity>
   


      );
  };

  export default ButtonSave;