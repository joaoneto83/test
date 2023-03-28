import { StyleSheet } from "react-native";
const styles = StyleSheet.create({

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
    containerProcedura:{
      flex: 0,
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
      textTrueProcedura: {
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor:'#E4A83B',
        borderWidth: 2,
        borderColor:"#E4A83B",
        borderRadius:4,
        padding:3,
        paddingHorizontal:8,
        margin:10
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
      boxInfoControllo: {
        flex: 0,
        flexDirection: "row",
        alignItems: "stretch",
      },
      listControllo: {
        flex: 0,
        flexDirection: "row",
        alignItems: "stretch",
        paddingBottom:10,
        paddingTop:10,
        borderBottomWidth:1,
        marginBottom:15,
        borderColor: "#9f9f9f29"
      },
      labelControllo: {
        fontSize: 20, 
        marginTop: 10,
        color: '#000'
      },
  });

  export default styles;