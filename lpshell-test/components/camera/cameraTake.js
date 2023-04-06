
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "./style"
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
 
export default function CameraTake() {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted");
    })();
  }, []);
 
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function takePicture() {
    if (camRef) {  
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);-
      setOpen(true);
      console.log(data);
    }
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef}>
        <View style={styles.contentButtons}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <FontAwesome name="exchange" size={23} color="red"></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
            <FontAwesome name="camera" size={23} color="#fff"></FontAwesome>
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto && (
        <Modal animationType="slide" transparent={true} visible={open}>
          <View style={styles.contentModal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <FontAwesome name="close" size={50} color="#fff"></FontAwesome>
            </TouchableOpacity>
            <Image style={styles.imgPhoto} source={{ uri: capturedPhoto }} />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}