import React from 'react';
import { View, Text, Image } from 'react-native';

const ResultScreen = ({ route }) => {
  const { imageUri } = route.params;
  
  // AI result would go here (e.g., fetched from the backend)
  const aiResult = "Recyclable"; 

  return (
    <View>
      <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />
      <Text>AI Result: {aiResult}</Text>
    </View>
  );
};

export default ResultScreen;
