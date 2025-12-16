import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [booking, ...state.bookings],
        })),
      loadBookings: (bookings) => set({ bookings }),
      clearBookings: () => set({ bookings: [] }),
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);