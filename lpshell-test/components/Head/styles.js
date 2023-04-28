// import { StyleSheet } from "react-native";
import StyleSheet from 'react-native-media-query';
const {ids, styles} = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'row',
      paddingTop:"3%",
      paddingLeft:"3%",
      paddingRight:"3%",
      paddingBottom:"1%",
      alignItems:"center",
      justifyContent:"space-evenly"
   
    },
     boxHead: {
        flex: 0,
        flexDirection: "row",
      }, 
      iconeLP: {
     
        height: 70,
        '@media (min-width: 1200px)': {
        height: 100,
      },
      },
      icone: {
        width: 50, 
        height: 35,
      },
      iconeSearch: {
        width: 20, 
        height: 20,
      },
  
      iconeMissioni:{
        width: 35, 
        height: 50,
      },
      buttonHead:{
        padding:20,
        curso: 'pointer'
      },
      buttonQRCode:{
        backgroundColor:"#E4A83B",
        borderRadius:5,
        padding:10,
        marginRight:50
      },
      textQRcode:{
        color:"#fff",
        fontSize:23,
      },
      title: {
        fontSize: 30,
        marginBottom: 10,
        marginTop: 20,
        color: '#787777'
      },
      offlineTitle: {
        fontSize: 18,
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
      containerSearch:{
        flex:0,
        flexDirection:"row-reverse",
        justifyContent:"flex-start",
        minWidth: '50%',
        
      },
      boxSearch:{
        flex:0,
        flexDirection:"row",
        paddingHorizontal:5,
        marginTop:10,
        borderRadius: 5,
        borderColor: "#787777",
        borderBottomWidth:1,
        height:30,
        maxWidth:"50%",
        minWidth:"50%"
      },
      input:{
        paddingHorizontal:5,
        minWidth: '20%',
        height:20,
        marginLeft:5,
      }
  });

  export default styles;