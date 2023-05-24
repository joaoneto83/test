// import { StyleSheet } from "react-native";
import StyleSheet from 'react-native-media-query';
const {ids, styles} = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'row',
      paddingTop:"1%",
      paddingLeft:"3%",
      paddingRight:"3%",
    
      alignItems:"center",
      justifyContent:"space-evenly"
   
    },
     boxHead: {
        flex: 0,
        flexDirection: "row",
      }, 
      iconeLP: {
        height: 60,
        '@media (min-width: 1200px)': {
        height: 100,
      },
      },
      icone: {
        width: 40, 
        height: 35,
      },
      iconeSearch: {
        width: 20, 
        height: 20,
      },
  
      iconeMissioni:{
        width: 35, 
        height: 35,
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
        fontSize: 25,
        marginBottom: 10,
        marginTop: 20,
        color: '#787777'
      },
      offlineTitle: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 20,
        color: '#787777'
      },
      subTitle: {
        fontSize: 22,
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
        justifyContent:"flex-start",
        paddingHorizontal:5,
        marginTop:10,
        borderRadius: 5,
        borderColor: "#787777",
        borderBottomWidth:1,
        height:25,
        maxWidth:"50%",
        minWidth:"50%"
      },
      input:{
        paddingHorizontal:5,
        minWidth: '40%',
        maxWidth: '90%',
        height:20,
        marginLeft:5,
      },
      modalContentSave: {
        flexDirection:"column",
        backgroundColor: 'white',
        alignItems:"center",
        padding: 22,
        justifyContent:"space-between",
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        textAlign:"center",
     
      },
      imagemClose:{
        width: 25, 
        height: 25, 
      },
  });

  export default styles;