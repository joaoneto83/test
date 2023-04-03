import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex:1,
     
    },
    containerScan: {
     
     
        minHeight:"80%",
        // marginRight: '25%',
        // marginTop: '-5%',
        // transform: [{ rotate: '-90deg'}],
      },
    Button: {
  
     padding:20,
     transform: [{ rotate: '90deg'}]
    },
    image: {
      width: 120, 
      height: 80,
     },
     text: {
      color:'#fff',
     },
     textQr: {
      fontSize: 20, 
      marginTop: 20,
      marginLeft:50,
      color: '#9F9F9F'
    },
    textItem: {
      fontSize: 20, 
      marginTop: 20,
      marginLeft:10,
      color: '#9F9F9F'
    },
     boxHead: {
        flex: 0,
        flexDirection: "row",
      }, 
      iconeLP: {
        width: 100, 
        height: 100,
        borderRadius: 5 ,
      },
      icone: {
        width: 70, 
        height: 50,
      },
      buttonHead:{
        padding:20,
        curso: 'pointer'
      },
      title: {
        fontSize: 35,
        marginBottom: 10,
        marginTop: 20,
        color: '#787777'
      },
      boxHome: {
        flex: 1,
        flexDirection: "row",
        justifyContent:'flex-end',
        alignItems: 'center',
       
      },
      buttonScanSecund:{
        marginTop:"7%"
      },
      buttonImageIconStyleSecund:{
        width: 120, 
        height: 90,
      },
      check:{
        width: 80, 
        height: 52,
        marginTop: -60,
        marginLeft: 20
      },
      buttonScan:{
        padding:20,
     
      },
      buttonImageIconStyle:{
        width: 265, 
        height: 200,
     
      },
      boxInfo: {
        flex: 0,
        flexDirection: "row",
       
        alignItems: 'center',
      },
      buttonCamera:{
        padding:20,
        paddingLeft:"20%",
        curso: 'pointer'
      },
      buttonImageStyle:{
        width: 90, 
        height: 72,
      },
  });

  export default styles;