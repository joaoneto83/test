// import { StyleSheet } from "react-native";
import StyleSheet from 'react-native-media-query';
const {ids, styles} = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  buttonImageIconStyle:{
    width: 200, 
    '@media (min-width: 1200px)': {
      width: 300, 
  },
},
  button:{
    padding:20,
    curso: 'pointer'
  },
  boxHead: {
    flex: 1,
    flexDirection: "row",
    alignItems:"center"
  },
  box: {
    flex: 0,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center', 
    height:"80%"
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
    height: "100%",
  },
  welcomeText: {
    fontSize: 20, 
    marginTop: 10
  }
});
export default styles;