import { StyleSheet } from "react-native"
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonCamera: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
 
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    
  },
  contentModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 20,
  },
  boxImg:{
    backgroundColor:"rgba( 0, 0, 0, .6)",
    padding:10,
    flexDirection:"row",
    justifyContent:"center",
    width:"100%",
    alignItems:"center"
  },
  sendButton:{
    margin:20,
    alignItems:"center",
    justifyContent:"center",
    width:150,
    height:50,
    backgroundColor:"#86F330",
    borderRadius:5
  },
  cancelButton:{
    margin:20,
    alignItems:"center",
    justifyContent:"center",
    width:150,
    height:50,
    backgroundColor:"#F35330",
    borderRadius:5
  },

  closeButton: {
    position: "absolute",
    top: 10,
    left: 2,
    margin: 10,
  },
  imgPhoto: {
    borderWidth:2,
    borderColor:"white",
    width: 600,
    height: 400,
  },
});
 
export default styles