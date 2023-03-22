import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'row',
      paddingTop:30,
      paddingLeft:30,

   
    },

 

  
     boxHead: {
        flex: 0,
        flexDirection: "row",
      }, 
      iconeLP: {
        width: 70, 
        height: 70,
        borderRadius: 5 ,
      },
      icone: {
        width: 50, 
        height: 35,
      },
      buttonHead:{
        padding:20,
        curso: 'pointer'
      },
      title: {
        fontSize: 30,
        marginBottom: 10,
        marginTop: 20,
        color: '#787777'
      },
      subTitle: {
        fontSize: 25,
        marginBottom: 10,
        marginTop: 25,
        marginLeft:30,
        color: '#9F9F9F'
      },
  });

  export default styles;