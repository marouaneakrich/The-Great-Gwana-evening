import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useArtists } from '../services/queries';
import { MaterialIcons } from '@expo/vector-icons';
import ArtistCard from '../components/ArtistCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import colors from '../constants/colors';

const ArtistsListScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const { data: artists, isLoading, isError, error, refetch } = useArtists(search);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search artists..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ArtistCard
            artist={item}
            onPress={() => navigation.navigate('ArtistDetail', { id: item.id })}
          />
        )}
        onRefresh={refetch}
        refreshing={isLoading}
        ListEmptyComponent={
          <EmptyState
            icon="people"
            message={search ? 'No artists match your search.' : 'No artists found.'}
            style={styles.empty}
          />
        }
        contentContainerStyle={styles.list}
      />
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
    backgroundColor: colors.white,
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  empty: {
    marginTop: 40,
  },
});

export default ArtistsListScreen;