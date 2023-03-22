import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingTop:30,
      paddingLeft:30,
    },
    containerScan: {
        width:'40%',
        marginLeft: '-10%',
        marginTop: '10%',
        transform: [{ rotate: '-90deg'}]
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
      subTitle: {
        fontSize: 35,
        marginBottom: 10,
        marginTop: 20,
        marginLeft:30,
        color: '#9F9F9F'
      },
  });

  export default styles;