import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ResultScreen = ({ route }) => {
  const { imageUri } = route.params;
  const [aiResult, setAiResult] = useState(null);  // Store AI result
  const [loading, setLoading] = useState(true);    // Store loading state
  const [error, setError] = useState(null);        // Store error state

  useEffect(() => {
    const classifyImage = async () => {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'photo.jpg', // You can modify this to get the correct extension
        type: 'image/jpeg', // Adjust the type accordingly
      });

      try {
        const response = await axios.post('http://127.0.0.1:5000/classify', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setAiResult(response.data);   // Save the AI result
      } catch (error) {
        console.error(error);
        setError('Failed to get AI result');
      } finally {
        setLoading(false);  // Set loading to false whether success or error
      }
    };

    classifyImage();
  }, [imageUri]);

  // Show loading spinner while the API request is being made
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Analyzing image...</Text>
      </View>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Show the image and AI result
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.resultText}>AI Result: {aiResult ? JSON.stringify(aiResult) : 'No result'}</Text>
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ResultScreen;
