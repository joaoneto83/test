import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30

  },
  buttonImageIconStyle:{
    width: 200, 
    height: 150,
  },
  button:{
    padding:20,
    curso: 'pointer'
  },
  boxHead: {
    flex: 0,
    flexDirection: "row",
  },
  box: {
    flex: 0,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: "10%" 
  },
  title: {
    fontSize: 35,
    marginBottom: 10,
    marginTop: 20,
    paddingLeft:20,
    color: '#787777'
  },
  image: {
    width: 100, 
    height: 100, 
    borderRadius: 50
  },
  imageicone: {
    width: 100, 
    height: 100, 
    borderRadius: 50
  },
  icone: {
    width: 100, 
    height: 100,
    borderRadius: 5 ,
  },
  welcomeText: {
    fontSize: 20, 
    marginTop: 10
  }
});
export default styles;