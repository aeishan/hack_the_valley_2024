import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ResultScreen = ({ route, navigation }) => {
  const { imageUri } = route.params;
  
  const [aiResult, setAiResult] = useState(null);  // Store classification result
  const [action, setAction] = useState(null);      // Store action result
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
        const response = await axios.post('https://recycleapi.adaptable.app/classify', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 120000,  // Increase timeout to 60 seconds
        });
        // Extract the classification and action from the response
        setAiResult(response.data.classification);  // Store the classification (e.g., plastic)
        setAction(response.data.action);  // Store the action (e.g., RECYCLE)
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
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Analyzing image...</Text>
      </View>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }   

  // Show the image and AI result in a scrollable view
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      
      {/* Display the classification and action */}
      <Text style={styles.resultTitle}>Garbage Type</Text>
      <Text style={styles.resultText}>{capitalizeFirstLetter(aiResult)}</Text>

      <Text style={styles.resultTitle}>Suggested Action</Text>
      <Text style={styles.actionText}>{action}</Text>

      {/* Home Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f5',  // Light background color
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#007BFF',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 1,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  actionText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#28A745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
    color: '#fff',
  },
  errorText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    backgroundColor: '#007BFF',
  },
  errorContainer: {
    backgroundColor: '#FF4C4C',
  },
  button: {
    marginTop: 30,
    width: '80%',
    height: 60,  // Increased button height
    backgroundColor: '#FFD700',  // Yellow button
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',  // Black text to contrast with yellow button
  },
});

export default ResultScreen;
