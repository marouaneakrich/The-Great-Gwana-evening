import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useCreateBooking } from '../services/queries';
import { useBookingStore } from '../stores/bookingStore';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import colors from '../constants/colors';

const BookingFormScreen = () => {
  const navigation = useNavigation();
  const addBooking = useBookingStore((state) => state.addBooking);
  const { mutate: createBooking, isLoading } = useCreateBooking();

  const [form, setForm] = useState({
    email: '',
    full_name: '',
    phone: '',
    ticket_count: 1,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!form.full_name || form.full_name.trim().length < 3) {
      newErrors.full_name = 'Name must be at least 3 characters';
    }
    if (form.ticket_count < 1 || form.ticket_count > 10) {
      newErrors.ticket_count = 'Max 10 tickets allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    createBooking(form, {
      onSuccess: (data) => {
        addBooking(data.booking);
        Alert.alert(
          'Success!',
          `Your booking is confirmed!\nConfirmation code: ${data.booking.confirmation_code}`,
          [{ text: 'OK', onPress: () => navigation.navigate('MyBookings') }]
        );
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Booking failed');
      },
    });
  };

  const updateTicketCount = (delta) => {
    const newCount = form.ticket_count + delta;
    if (newCount >= 1 && newCount <= 10) {
      setForm({ ...form, ticket_count: newCount });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.full_name && styles.errorInput]}
          value={form.full_name}
          onChangeText={(text) => setForm({ ...form, full_name: text })}
        />
        {errors.full_name && <Text style={styles.errorText}>{errors.full_name}</Text>}

        <Text style={styles.label}>Phone (optional)</Text>
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Number of Tickets *</Text>
        <View style={styles.ticketCounter}>
          <Button 
            title="-" 
            onPress={() => updateTicketCount(-1)}
            style={styles.counterButton}
          />
          <Text style={styles.count}>{form.ticket_count}</Text>
          <Button 
            title="+" 
            onPress={() => updateTicketCount(1)}
            style={styles.counterButton}
          />
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price:</Text>
          <Text style={styles.price}>150 MAD × {form.ticket_count} = {150 * form.ticket_count} MAD</Text>
        </View>

        <Button 
          title="Confirm Booking" 
          onPress={handleSubmit}
          style={styles.submitButton}
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
  formCard: {
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  ticketCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  counterButton: {
    width: 40,
    height: 40,
    padding: 0,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 24,
    color: colors.textPrimary,
  },
  priceContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 24,
  },
});

export default BookingFormScreen;