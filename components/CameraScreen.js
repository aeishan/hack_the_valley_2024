import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      setPhoto(photoData.uri);
      navigation.navigate('Result', { photoUri: photoData.uri });
    }
  };


  

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}> Take Picture </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {photo && <Image source={{ uri: photo }} style={styles.preview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  preview: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default CameraScreen;
