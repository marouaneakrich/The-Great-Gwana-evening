import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const ArtistCard = ({ artist, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: artist.photo_url || 'https://via.placeholder.com/80' }} 
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.bio} numberOfLines={2}>
          {artist.bio || 'No bio available'}
        </Text>
        <Text style={styles.time}>
          <MaterialIcons name="schedule" size={14} color={colors.accent} />
          {' '}
          {new Date(artist.performance_time).toLocaleString()}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  bio: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: colors.accent,
    marginTop: 4,
  },
});

export default ArtistCard;