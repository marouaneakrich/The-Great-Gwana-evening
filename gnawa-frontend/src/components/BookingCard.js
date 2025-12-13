import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

const BookingCard = ({ booking }) => {
  const [expanded, setExpanded] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(booking.confirmation_code);
    Alert.alert('Copied', 'Confirmation code copied to clipboard!');
  };

  const shareBooking = () => {
    const url = `gnawaapp://booking/${booking.confirmation_code}`;
    Linking.openURL(`mailto:?subject=My Gnawa Booking&body=My confirmation code: ${booking.confirmation_code}\n\nView: ${url}`);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          <Text style={styles.code}>{booking.confirmation_code}</Text>
          <MaterialIcons name={expanded ? 'expand-less' : 'expand-more'} size={24} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>

      <Text style={styles.date}>
        {new Date(booking.created_at).toLocaleDateString()}
      </Text>
      <Text style={styles.tickets}>
        {booking.ticket_count} {booking.ticket_count > 1 ? 'tickets' : 'ticket'}
      </Text>

      {expanded && (
        <View style={styles.details}>
          <View style={styles.qrPlaceholder}>
            <MaterialIcons name="qr-code" size={48} color={colors.textSecondary} />
            <Text style={styles.qrText}>Show at event entrance</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
              <MaterialIcons name="content-copy" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Copy Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={shareBooking}>
              <MaterialIcons name="share" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  code: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tickets: {
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 4,
  },
  details: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  qrPlaceholder: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  qrText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    marginLeft: 8,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default BookingCard;