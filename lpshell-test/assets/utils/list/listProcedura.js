import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View,ScrollView } from "react-native";


import styles from "./list-styles";


function ListProcedura(props) {
    const [item, getitem] = useState("");
 
   useEffect(() => {
    console.log("listProcedura",props,item)
    
   }, [item]
   )
 
 
      return (
         <View>
              <Text style={styles.title}>Procedures</Text>
        <View style={styles.containerProcedura} >   
       
         {  props?.list.map((item) => (
             <TouchableOpacity  onPress={() => props.callbackProcedura(item)}  >
            <Text style={styles.textTrueProcedura}> {item.name}</Text>
           </TouchableOpacity>
            ) )
         }  

        </View>  
        </View>
      );
  };

  export default ListProcedura;