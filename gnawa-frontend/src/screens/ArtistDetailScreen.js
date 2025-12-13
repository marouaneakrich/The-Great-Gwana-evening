import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { MaterialIcons } from '@expo/vector-icons';
import { useArtist } from '../services/queries';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import colors from '../constants/colors';

const ArtistDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const { data: artist, isLoading, isError, error, refetch } = useArtist(id);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

  const handleBook = () => {
    navigation.navigate('BookingForm', { artistId: id, artistName: artist.name });
  };

  const addToCalendar = () => {
    alert('Calendar integration would go here!');
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: artist.photo_url || 'https://via.placeholder.com/400x300' }} 
        style={styles.banner}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{artist.name}</Text>

        <View style={styles.infoCard}>
          <View style={styles.detailRow}>
            <MaterialIcons name="schedule" size={20} color={colors.accent} />
            <Text style={styles.detailText}>
              {new Date(artist.performance_time).toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity style={styles.detailRow} onPress={addToCalendar}>
            <MaterialIcons name="event" size={20} color={colors.accent} />
            <Text style={[styles.detailText, styles.link]}>Add to Calendar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bioCard}>
          <Text style={styles.bioTitle}>About the Artist</Text>
          <Text style={styles.bioText}>{artist.bio || 'No bio available.'}</Text>
        </View>

        <Button 
          title="Book Ticket for This Performance" 
          onPress={handleBook}
          style={styles.bookButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 15,
    color: colors.textPrimary,
  },
  link: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  bioCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bookButton: {
    marginBottom: 32,
  },
});

export default ArtistDetailScreen;