import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {captureScreen} from 'react-native-view-shot';

const cameratest = () => {
  const [imageURI, setImageURI] = useState(
    'https://developerplus.com.br/wp-content/uploads/2021/10/react_native_logo.png',
  );
  const [savedImagePath, setSavedImagePath] = useState('');

  const takeScreenShot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8, 
    }).then(
      (uri) => {
        setSavedImagePath(uri);
        setImageURI(uri);
      },
      (error) => console.error('Ops, algo deu errado', error),
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
        clicca per fotografare
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={takeScreenShot}>
        <Image
          source={{uri: imageURI}}
          style={{
            width: 600,
            height: 600,
            resizeMode: 'contain',
            marginTop: 5
          }}
        />

          <Text style={styles.buttonTextStyle}>
            Capturar Tela
          </Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          {
            savedImagePath ?
            `Caminho da Imagem Salva:
             ${savedImagePath}` : ''
          }
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default cameratest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    fontSize: 20,
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
});