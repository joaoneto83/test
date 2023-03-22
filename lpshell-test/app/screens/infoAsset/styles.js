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
  
  buttonImage:{
    width: 150, 
    height: 120,
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

  modalContent: {
    flexDirection:"row-reverse",
    backgroundColor: 'white',
    padding: 22,
    justifyContent:"space-between",
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
  
  boxInfoControllo: {
    flex: 0,
    flexDirection: "row",
    alignItems: "stretch",

  },
  boxImage: {
    flex: 0,
    alignItems: 'center',
    paddingTop:"10%"
  },

  boxHome: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'flex-end',
    alignItems: 'center',
   
  },
  boxDetail: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'flex-start',
    paddingTop: "5%"
  },
  containerControllo: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding:30,
    // borderWidth:2,
  },
  boxControlloLeft: {
    flex: 0,
    padding:10,
    borderEndWidth:1,
    borderColor:"#9f9f9f29",
    justifyContent: "space-between"
  },
  boxControlloRight: {
    flex: 0,
    flexDirection: "column",
    padding:10,
    alignItems: "flex-end"
  
  },
  ListControllo: {
    flex: 0,
    flexDirection: "row",
  
    alignItems: "stretch",
    paddingBottom:10,
    paddingTop:10,
    borderBottomWidth:1,
    borderColor: "#9f9f9f29"
  },
  boxButton: {
   paddingLeft:"10%",
   paddingTop:10
  },
  listbutton:{
    paddingLeft:10
  },
  title: {
    fontSize: 20,
    color: '#9F9F9F',
  },
  ImagemButton: {
    width: 25, 
    height: 25, 
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
  BoxImagemButton:{
    paddingLeft:10,
    marginBottom:-5
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
  infoDetail: {
    fontSize: 15, 
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
  labelControllo: {
    fontSize: 20, 
    marginTop: 10,
    color: '#000'
  },
  labelControlloDetail: {
    fontSize: 15, 
    marginTop: 10,
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
    justifyContent: "space-between",
    alignItems:"center"
    
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  boxButtonControllo:{
    borderColor: "red",
    borderEndWidth:2,
    paddingLeft:40,
    paddingRight:20
  },
  

});
export default styles;