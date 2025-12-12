import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api';

export const useEventInfo = () => {
  return useQuery({
    queryKey: ['event'],
    queryFn: async () => {
      const { data } = await api.get('/event');
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useArtists = (search = '') => {
  return useQuery({
    queryKey: ['artists', search],
    queryFn: async () => {
      const { data } = await api.get('/artists', {
        params: { search: search || undefined },
      });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useArtist = (id) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: async () => {
      const { data } = await api.get(`/artists/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData) => {
      const { data } = await api.post('/bookings', bookingData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
    },
  });
};

export const useBookingsByEmail = (email) => {
  return useQuery({
    queryKey: ['bookings', email],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/email/${email}`);
      return data;
    },
    enabled: !!email,
    staleTime: 1000 * 60 * 1, 
  });
};

export const useBookingByCode = (code) => {
  return useQuery({
    queryKey: ['booking', code],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/${code}`);
      return data;
    },
    enabled: !!code,
  });
};