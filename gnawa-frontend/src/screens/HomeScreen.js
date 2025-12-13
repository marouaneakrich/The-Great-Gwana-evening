import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useEventInfo } from '../services/queries';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import colors from '../constants/colors';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { data: event, isLoading, isError, error, refetch } = useEventInfo();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: event.banner_url || 'https://via.placeholder.com/400x200' }} 
        style={styles.banner}
        resizeMode="cover"
      />

      <View style={styles.infoCard}>
        <Text style={styles.title}>{event.event_name}</Text>
        <Text style={styles.description}>{event.description}</Text>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color={colors.accent} />
            <Text style={styles.detailText}>
              {new Date(event.date).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color={colors.accent} />
            <Text style={styles.detailText}>{event.venue}</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="attach-money" size={20} color={colors.accent} />
            <Text style={styles.detailText}>{event.ticket_price} MAD</Text>
          </View>
        </View>

        <Button 
          title="Book Now" 
          onPress={() => navigation.navigate('BookingForm')}
          style={styles.bookButton}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => navigation.navigate('ArtistsList')}
        >
          <MaterialIcons name="people" size={32} color={colors.primary} />
          <Text style={styles.actionText}>View Artists</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => navigation.navigate('MyBookings')}
        >
          <MaterialIcons name="confirmation-number" size={32} color={colors.primary} />
          <Text style={styles.actionText}>My Tickets</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>About Gnawa Music</Text>
        <Text style={styles.aboutText}>
          Gnawa music is a rich Moroccan spiritual tradition combining African rhythms, 
          Islamic Sufism, and healing ceremonies. Experience the hypnotic sounds of the 
          Gimbri, Krakebs, and powerful ceremonial chants.
        </Text>
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
    height: 200,
  },
  infoCard: {
    backgroundColor: colors.white,
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  details: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 15,
    color: colors.textPrimary,
  },
  bookButton: {
    marginTop: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  aboutCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default HomeScreen;