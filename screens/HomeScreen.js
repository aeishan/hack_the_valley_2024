import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Our Mission: Help the planet by sorting waste correctly.</Text>
      <Button title="Use Camera" onPress={() => navigation.navigate('Camera')} />
      <Button title="Upload Image" onPress={() => navigation.navigate('Upload')} />
    </View>
  );
};

export default HomeScreen;
