// import { StyleSheet } from "react-native";
import StyleSheet from 'react-native-media-query';

const {ids, styles} = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection:"row",
        paddingHorizontal:10,
      },
      containerMission: {
        flex: 1,
        paddingRight:30,
      },
    
    boxLeft:{
        paddingTop:30,
        minWidth:"25%",
        maxWidth:"27%",
        alignItems:"center",
        borderEndWidth:1,
        borderColor:"#e1e1e1"
    },

    boxRigth:{
        paddingTop:10,
        paddingLeft:10,
        width:"70%",
        minHeight:"80%"
    },
    DataTableHeader:{
        flex:0,
        flexDirection: "row", 
        alignItems:"center",
    },
    DataTableBody:{
      flex:0,
      flexDirection: "row", 
      alignItems:"center",
      borderBottomWidth:0.5,
      borderBottomColor:"#e1e1e1",
  },
    
    DatacTableRow:{
        flex:0,
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        padding:5,
        Width:"100%",
   
        borderWidth:1,

    },
    DataTableHeaderHome:{
    
        flexDirection: "row",
        justifyContent:"center",
        padding:5,  


    },
    
    DatacTableRowHome:{
        flex:0,
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        padding:5,
        minWidth:"100%",
        maxWidth:"100%",
    },
    boxTableHeader:{
      width:200,
      fontSize: 20, 
      color:"#787777",
      paddingVertical:20,
      textAlign: 'center',
      alignItems: "center",

      '@media (min-width: 1200px)': {
        width:270
      },
    },
    modalHeader:{
     
      fontSize: 20, 
      color:"#787777",
      paddingVertical:20,
      textAlign: 'center',
      alignItems: "center",

    },
    boxTableBody:{
      width:200,
      fontSize: 16, 
      color:"#000000",
      paddingVertical:5,
      borderBottomWidth:1,
      borderColor:"#e1e1e1",
      alignItems: "center",
      textAlign: 'center',
      
      '@media (min-width: 1200px)': {
        width:270
      },
    },
    iconeArrow:{
      width:21
    },
    modalContent: {
      flexDirection:"row-reverse",
      backgroundColor: 'white',
      padding: 22,
      justifyContent:"space-between",
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    imagemClose:{
      width: 25, 
      height: 25, 
    },
    headerLabel:{
        flex:0,
        fontSize: 20, 
        color:"#787777",
        paddingVertical:20,
        textAlign: 'center',
        alignItems: "center",
        width:200,
        '@media (min-width: 1200px)': {
            width:350
        },
    },
    labelHeaderD:{
        textAlign: 'center',
        width:150,
    
        fontSize: 20, 
        color:"#787777",
        height:50,
        paddingHorizontal:5
    },
    labelHeaderI:{
        textAlign: 'center',
        maxWidth:"20%",
        minWidth:"20%",
        fontSize: 20, 
        height:50,
        color:"#E4A83B"
    },

    labelRow:{
        fontSize: 14, 
        minWidth:"16%",
        color:"#787777",
        '@media (min-width: 1200px)': {
            fontSize: 16, 
            maxWidth:100,
            minWidth:70,
        },
    },
    labelRowP:{
        fontSize: 16, 
        minWidth:"16%",
        '@media (min-width: 1200px)': {
            fontSize: 18, 
            maxWidth:100,
            minWidth:70,
        },
    },
    rowD:{
        textAlign: 'center',
        alignItems:"center",
        maxWidth:"20%",
        minWidth:"20%",
        paddingTop:10,
        height:60,
    },
    iconRow:{
        height:35
    },
    rowLabel:{
        flex:0,
        fontSize: 18, 
        color:"#000000",
        paddingVertical:5,
        borderBottomWidth:1,
        borderColor:"#9F9F9F",
        alignItems: "center",
        textAlign: 'center',
        width:200,
        '@media (min-width: 1200px)': {
          width:350
        },
    },
    boxImage:{
     padding:20,
    },

       
    boxImageControllo: {
        flex: 0,
        flexDirection: "row",
        alignItems: 'center',
        paddingTop:"10%",
        '@media (min-width: 1200px)': {
            paddingHorizontal :20,
        },
      },
      boxButtonSave:{
        flex: 0,
        flexDirection: 'row',
        justifyContent:"flex-end",
        alignItems:"center"
      },
    buttonImage:{
       width:107,
       height:80
    },
    label: {
        fontSize: 20, 
        color:"#787777",
        padding:10
      },
    Title: {
        fontSize: 25, 
        color: '#9F9F9F',
        padding:10,
        '@media (min-width: 1200px)': {
            fontSize: 23,
        },
      },
      titleControllo: {
        fontSize: 20,
        color: '#9F9F9F',
        '@media (min-width: 1200px)': {
            fontSize: 23,
        },
      },

      BoxImagemButton:{
        paddingLeft:10,
        marginBottom:-5
      },
      titleSave: {
        textAlign:"center",
        fontSize: 20,
        color: '#9F9F9F',
      },
      containerControllo: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding:30,
      },
      boxControlloLeft: {
        flex: 0,
        padding:10,
        borderEndWidth:1,
        borderColor:"#9f9f9f29",
        justifyContent: "space-between",
   
        '@media (min-width: 1200px)': {
          paddingLeft:20,
      },
      },
      boxControlloRight: {
        flex: 0,
        flexDirection: "column",
        padding:10,
        alignItems: "flex-end"
      },
      boxFlex:{
        flex:0,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
      },
      imagemClose:{
        width: 25, 
        height: 25, 
      },
      imagemChevron:{
        width: 14, 
        height: 25, 
      },
      imagemCheronI:{
        width: 14, 
        height: 25, 
        transform: "scaleX(-1)"
      },
      labelControlloDetail: {
        fontSize: 15, 
        marginTop: 10,
        color: '#000',
        '@media (min-width: 1200px)': {
            fontSize: 18,
        },
      },
      buttonImageGellery:{
        width: 70, 
        height: 60,
        marginLeft:10
      },
      check:{
        width: 80, 
        height: 52,
        marginTop: -60,
        marginLeft: 20
      },
      infoDetail: {
        fontSize: 15, 
        marginTop: 10,
        marginLeft:10,
        color: '#9F9F9F',
        '@media (min-width: 1200px)': {
            fontSize: 18,
        },
      },
      boxInfo: {
        flex: 0,
        flexDirection: "row",
       
        alignItems: 'center',
      },
      modalContent: {
        flexDirection:"row-reverse",
        backgroundColor: 'white',
        padding: 22,
        justifyContent:"space-between",
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      modalContentSave: {
        flexDirection:"column",
        backgroundColor: 'white',
        padding: 22,
        justifyContent:"space-between",
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        textAlign:"center"
      },
}
)

export default styles;
