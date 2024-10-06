import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trash Ninja</Text>

      <Text style={styles.missionText}>
        Our Mission: Help the planet by sorting waste correctly.
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>Use Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#E8F5E9',  // A softer green background for a more eco-friendly look
  },
  title: {
    fontSize: 36,
    fontWeight: '700',  // Bold font for prominence
    color: '#1B5E20',   // A dark green to match your theme
    marginBottom: 30,   // Space between the title and the mission text
    textAlign: 'center',
  },
  missionText: {
    fontSize: 24,  // Slightly smaller, but clean
    fontWeight: '600', 
    textAlign: 'center', 
    marginBottom: 80, 
    color: '#2E7D32',  // A dark green that matches the theme
    paddingHorizontal: 20,
    lineHeight: 34, // Better readability
  },
  button: {
    backgroundColor: '#388E3C', // Darker green to emphasize the environmental theme
    paddingVertical: 18, 
    paddingHorizontal: 50, 
    borderRadius: 12,  // More rounded corners for a modern feel
    marginBottom: 20, 
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,  // Adds shadow on Android
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600',  // Slightly thicker font weight for prominence
  }
});

export default HomeScreen;
