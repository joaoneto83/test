import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderRadius:4,
      borderColor:"#E4A83B",
      margin:10,
      paddingHorizontal:20,
      paddingVertical:10
    },
    containerOnOff:{
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      margin:5,
      borderWidth: 2,
      borderColor:"#E4A83B",
      borderRadius:6,
      width: 82,
      height:32

    },
    containerControllo:{
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      margin:5,
      borderWidth: 2,
      borderColor:"#E4A83B",
      borderRadius:6,
      height:32
    },
      icone: {
        width: 48, 
        height: 45,
      },
      buttonHead:{
        curso: 'pointer'
      },
      title: {
        fontSize: 20,
        color: '#9F9F9F',
        paddingHorizontal:20,
        paddingVertical:10
      },
      textTrue: {
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor:'#E4A83B',
        borderWidth: 2,
        borderColor:"#E4A83B",
        borderRadius:4,
        padding:3,
        paddingHorizontal:8
      },
      textFalse: {
        fontSize: 16,
        color: '#E4A83B',
        padding:3,
        paddingHorizontal:6
      },
      esc: {
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor:'#F35330',
        borderWidth: 2,
        borderColor:"#F35330",
        borderRadius:4,
        paddingTop:10,
        paddingLeft:5,
        margin:10,
        width:50,
        height:50

      },
      save: {
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor:'#86F330',
        borderWidth: 2,
        borderColor:"#86F330",
        borderRadius:4,
        padding:10,
        margin:10,
        width:50,
        height:50
      }
  
  });

  export default styles;