import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection:"row",
        paddingHorizontal:30,
      },
    boxLeft:{
        paddingTop:30,
       minWidth:"30%",
       alignItems:"center",
       justifyContent:"center",
       borderEndWidth:1,
       borderColor:"#e1e1e1"
    },

    boxRigth:{
        paddingTop:10,
        minWidth:"70%",
        alignItems:"center",
    },
    DataTableHeader:{
        flex:0,
        flexDirection: "row",
        justifyContent:"center",
        padding:5,  
      
    },
    
    DatacTableRow:{
        flex:0,
        flexDirection: "row",
        justifyContent:"center",
        padding:5,
        
    },
    headerLabel:{
        flex:0,
        fontSize: 20, 
        color:"#787777",
        paddingVertical:20,
        textAlign: 'center',
        alignItems: "center",
        width:300
    },
    labelHeaderD:{
        textAlign: 'center',
        minWidth:"16%",
        fontSize: 20, 
        color:"#787777",
        height:50
    },
    labelHeaderI:{
        textAlign: 'center',
        minWidth:"16%",
        fontSize: 20, 
        height:50,
        color:"#E4A83B"
    },

    labelRow:{
  
        minWidth:"16%",

    },
    rowD:{
        textAlign: 'center',
        alignItems:"center",
        minWidth:"20%",
        height:50
    },
    iconRow:{
        width:35,
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
        width:300
    },
    boxImage:{
     padding:20,
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
        padding:10
      },
}
)

export default styles;
