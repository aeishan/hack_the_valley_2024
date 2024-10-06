import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Slider from '@react-native-community/slider';
//import Button from './components/Button';



export default function CameraScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermissions] = MediaLibrary.usePermissions();

  if (!cameraPermission || !mediaLibraryPermissionResponse){
    // permissions are still loading
    return <View/>
  }

  if (!cameraPermission.granted || mediaLibraryPermissionResponse.status !== 'granted'){
    // permissions are not granted yet
    return(
      <View style={styles.container}>
        <Text>We need your permission to continue</Text>
        <TouchableOpacity style = {styles.button} onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermissions();
        }}>
            <Text style={styles.buttonText}>Grant permissions</Text>
        </TouchableOpacity>
      </View>
    )

  }
  

  
  return (
    <View style={styles.container}>
      <View style={styles.topControlsContainer}>
        <Text style={{color:'white'}}>Top Controls</Text>
      </View>
      <CameraView style={styles.camera} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  topControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: '100%',
  }
});
