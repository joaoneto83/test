import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight:30,
  },
  containerDetail: {
    flex: 1,
    flexDirection: "column",
    paddingRight:30,
  },
  buttonImageIconStyle:{
    width: 265, 
    height: 200,
 
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
  buttonImageStyle:{
    width: 90, 
    height: 72,
  },

  buttonBorder:{
    borderColor: '#E4A83B'
  },
  buttonHead:{
    padding:20,
    curso: 'pointer'
  },
  button:{
    padding:20,
    curso: 'pointer'
  },
  buttonCamera:{
    padding:20,
    paddingLeft:"20%",
    curso: 'pointer'
  },
  buttonScan:{
    padding:20,
 
  },
  buttonScanSecund:{
    marginTop:"7%"
  },
  boxHead: {
    flex: 0,
    flexDirection: "row",
  },
  boxInfo: {
    flex: 0,
    flexDirection: "row",
   
    alignItems: 'center',
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems: 'center',
    marginTop: "-40%"
  },
  boxHome: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'flex-end',
    alignItems: 'center',
    marginTop: "-40%"
  },
  boxDetail: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'flex-start',
    marginTop: "-30%"
  },
  boxButton: {
   paddingLeft:"20%",
   paddingTop:10
  },
  title: {
    fontSize: 35,
    marginBottom: 10,
    marginTop: 20,
    color: '#787777'
  },
  image: {
    width: 100, 
    height: 100, 
    borderRadius: 50
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
  info: {
    fontSize: 20, 
    marginTop: 10,
    marginLeft:10,
    color: '#9F9F9F',

  },
  label: {
    fontSize: 20, 
    marginTop: 10,
    marginLeft:100,
    color: '#000'
  },
  text: {
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
  boxButtonSave:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding:10,
    marginBottom:50
  } 

});
export default styles;