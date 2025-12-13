import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error" size={48} color={colors.error} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      )}
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
  message: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ErrorMessage;