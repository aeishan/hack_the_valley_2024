import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadScreen = ({ navigation }) => {
  useEffect(() => {
    const openImageGallery = async () => {
      // Request permission to access the image library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
          // Pass the image URI directly instead of relying on state
          navigation.navigate('Result', { imageUri: result.assets[0].uri });
        } else {
          navigation.goBack(); // Go back if the user cancels
        }
      } else {
        alert("Permission to access camera roll is required!");
        navigation.goBack(); // Go back if permission is not granted
      }
    };

    openImageGallery();
  }, [navigation]); // Include `navigation` as a dependency

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading image gallery...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
});

export default UploadScreen;
