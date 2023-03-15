import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonControllo(props) {
    const [controllo, getOnOff] = useState(props.routes);

   useEffect(() => {
    console.log("radio",props,controllo )
    
   }, [controllo]
   )
 
 
      return (
        <View style={styles.containerControllo} >

          <TouchableOpacity  onPress={() => getOnOff("Giusto")}  >
            {controllo == "Giusto" ? <Text style={styles.textTrue}> Giusto</Text> : <Text style={styles.textFalse}> Giusto</Text>}
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => getOnOff("Errato")}  >
            {controllo == "Errato" ? <Text style={styles.textTrue}> Errato</Text> : <Text style={styles.textFalse}> Errato</Text>}
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => getOnOff("Manca")}  >
            {controllo == "Manca" ? <Text style={styles.textTrue}> Manca</Text> : <Text style={styles.textFalse}> Manca</Text>}
          </TouchableOpacity>

        </View>   
      );
  };

  export default ButtonControllo;