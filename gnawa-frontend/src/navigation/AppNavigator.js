import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

import HomeScreen from '../screens/HomeScreen';
import ArtistsListScreen from '../screens/ArtistsListScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['gnawaapp://'],
  config: {
    screens: {
      Home: 'home',
      ArtistsList: 'artists',
      ArtistDetail: 'artist/:id',
      BookingForm: 'book',
      MyBookings: 'bookings',
      BookingDetail: 'booking/:code',
    },
  },
};

const AppNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8B4513',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'The Great Gnawa Evening' }}
        />
        <Stack.Screen 
          name="ArtistsList" 
          component={ArtistsListScreen} 
          options={{ title: 'Artists' }}
        />
        <Stack.Screen 
          name="ArtistDetail" 
          component={ArtistDetailScreen} 
          options={{ title: 'Artist Details' }}
        />
        <Stack.Screen 
          name="BookingForm" 
          component={BookingFormScreen} 
          options={{ title: 'Book Ticket' }}
        />
        <Stack.Screen 
          name="MyBookings" 
          component={MyBookingsScreen} 
          options={{ title: 'My Bookings' }}
        />
      </Stack.Navigator>
  );
};

export default AppNavigator;