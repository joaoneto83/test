import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: "row",
      paddingLeft: "20%"
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 12,
      margin: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    ImageFull:{
      width: 400, 
      height:  "90%",
    },
    Image:{
      width: 50, 
      height:  50,
      margin: 5
    },
    ImageBOX:{
      padding:10,
      paddingTop:0,
      width:70
    },
  });

  export default styles;