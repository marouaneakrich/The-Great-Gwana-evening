import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { useBookingsByEmail } from '../services/queries';
import { useBookingStore } from '../stores/bookingStore';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import colors from '../constants/colors';

const MyBookingsScreen = () => {
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const addBooking = useBookingStore((state) => state.addBooking);

  const {
    data: bookings,
    isLoading,
    isError,
    error,
    refetch,
  } = useBookingsByEmail(searchEmail);

  const handleSearch = () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    setSearchEmail(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Find Bookings" onPress={handleSearch} style={styles.searchButton} />
      </View>

      {searchEmail && isLoading && <LoadingSpinner />}

      {searchEmail && isError && (
        <ErrorMessage message={error.message} onRetry={refetch} />
      )}

      {searchEmail && bookings && (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BookingCard booking={item} />}
          onRefresh={refetch}
          refreshing={isLoading}
          ListEmptyComponent={
            <EmptyState
              icon="inbox"
              message="No bookings found for this email."
              style={styles.empty}
            />
          }
          contentContainerStyle={styles.list}
        />
      )}

      {!searchEmail && (
        <EmptyState
          icon="search"
          message="Enter your email to view your bookings"
          style={styles.empty}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 20,
  },
  empty: {
    marginTop: 40,
  },
});

export default MyBookingsScreen;