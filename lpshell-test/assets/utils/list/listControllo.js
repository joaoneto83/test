import React, { useState, useEffect } from 'react';
import { Text,View,ScrollView } from "react-native";
import ButtonRadio from '../../../assets/utils/buttonBasi/ButtonRadio';
import ButtonControllo from '../../../assets/utils/buttonBasi/ButtonControllo';


import styles from "./list-styles";


function ListControllo(props) {
    const [item, getitem] = useState("");

   useEffect(() => {
    console.log("listControllo",props.list.attributes,item )
    
   }, [item]
   )
 
 
      return (
       
        <View  >
               <Text style={styles.title}>{props?.list?.name}</Text>
        <View style={styles.listControllo}>
        <View >
         {props.list?.attributes?.map((item) => (
          <View style={styles.boxInfoControllo}>
                <Text style={styles.labelControllo}>{item.description} : </Text>
          </View >
            ))}
         </View>
         <View >
    {props.list?.attributes?.map((item) => (
          <View style={styles.boxInfoControllo}>
                {item.format == 3 ? <ButtonRadio routes={true} /> : item.format == 4 ?
                <ButtonControllo routes={item.list} name={item.description} /> : item.format == 2 ? undefined : undefined}
          </View >
            ))}
         </View> 
         </View>
      
        </View>  
    
      );
  };

  export default ListControllo;