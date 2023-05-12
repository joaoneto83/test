import StyleSheet from 'react-native-media-query';
const {ids, styles} = StyleSheet.create({
    container:{
     padding:20,

    },

    input:{
        paddingHorizontal:5,
        minWidth: '20%',
        height:20,
        borderColor:"gray",
        borderBottomWidth:2,
        borderRadius:5
      },
      boxButtonSave:{
        marginRight:200,
        paddingTop:50,
        flexDirection: "row-reverse",
        alignItems:"flex-end",
        width:200
      },

})
export default styles;