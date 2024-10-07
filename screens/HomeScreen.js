import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [scaleValue] = useState(new Animated.Value(1));  // Initial scale value is 1

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,  // Button shrinks slightly when pressed
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,  // Button returns to its normal size
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.jpg')}  // Adjust the path according to your folder structure
        style={styles.logo} 
      />
      <Text style={styles.title}>TRASH NINJA</Text>

      <Text style={styles.missionText}>
        Our Mission: Help the planet by sorting waste correctly.
      </Text>

      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Camera')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>Use Camera</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Upload')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#E0F7FA',  // Light cyan background
  },
  logo: {
    width: 250,  // Adjust width as needed
    height: 250, // Adjust height as needed
    marginBottom: 30, // Add space below the logo
    borderRadius: 45, // This makes the image round
    overflow: 'hidden', // Ensure the overflow is hidden to show rounded corners
  },
  title: {
    fontSize: 38,
    fontWeight: '400',  
    color: '#000',  // Black text
    marginBottom: 40,  
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'ProtestStrike-Regular',  // Apply the custom font here
  },
  missionText: {
    fontSize: 22,  
    fontWeight: '600', 
    textAlign: 'center', 
    marginBottom: 70, 
    color: '#000',  // Black text
    paddingHorizontal: 25,
    lineHeight: 32,
    fontFamily: 'ProtestStrike-Regular',  // Apply the custom font here
  },
  button: {
    backgroundColor: '#4CAF50',  // Green button
    paddingVertical: 18, 
    paddingHorizontal: 50, 
    borderRadius: 25,  
    marginBottom: 20, 
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,  
  },
  buttonText: {
    color: '#000',  // Black text
    fontSize: 18, 
    fontWeight: '700',  
    textTransform: 'uppercase',  
    letterSpacing: 1.5,  
  }
});

export default HomeScreen;
