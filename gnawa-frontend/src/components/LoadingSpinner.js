import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';

const LoadingSpinner = ({ size = 'large', color = colors.accent }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default LoadingSpinner;