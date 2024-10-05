import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ResultScreen = ({ route }) => {
  const { imageUri } = route.params;

  // AI result would go here (e.g., fetched from the backend)
  const aiResult = "Recyclable"; 

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.resultText}>AI Result: {aiResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8', // Light background color
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10, // Rounded corners
    borderWidth: 2,
    borderColor: '#007BFF', // Match border color with button
    marginBottom: 20, // Space between image and text
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text color for better contrast
  },
});

export default ResultScreen;
