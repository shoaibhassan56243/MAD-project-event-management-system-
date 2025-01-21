import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Alert, TextInput, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventItem from './EventItem';
import { fetchMockEvents } from '../services/api';  
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';
import { Picker } from '@react-native-picker/picker';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('date'); 
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventData = await fetchMockEvents();
      setEvents(eventData);
      setFilteredEvents(eventData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch events.');
    }
  };

  const handleRegister = async (event, userDetails) => {
    try {
      const registeredEvents = JSON.parse(await AsyncStorage.getItem('registeredEvents')) || [];
      const registration = {
        ...userDetails,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.date,
      };

      await AsyncStorage.setItem(
        'registeredEvents',
        JSON.stringify([...registeredEvents, registration])
      );
      Alert.alert('Success', 'You have successfully registered for the event!');
    } catch (error) {
      Alert.alert('Error', 'Failed to register for the event.');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredEvents(
        events.filter(
          (event) =>
            event.name.toLowerCase().includes(query.toLowerCase()) ||
            event.venue.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredEvents(events);
    }
  };

  const handleSort = (sortBy) => {
    setSelectedSort(sortBy);
    let sortedEvents = [...filteredEvents];
    if (sortBy === 'date') {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'venue') {
      sortedEvents.sort((a, b) => a.venue.localeCompare(b.venue));
    }
    setFilteredEvents(sortedEvents);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <ThemeToggle />

      {/* Static search bar and sorting dropdown */}
      <View style={styles.headerContainer}>
        <TextInput
          style={[styles.searchInput, { color: isDarkTheme ? '#fff' : '#000' }]}
          placeholder="Search Events"
          placeholderTextColor={isDarkTheme ? '#aaa' : '#555'}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.sortContainer}>
          <Text style={[styles.sortText, { color: isDarkTheme ? '#fff' : '#000' }]}>Sort By:</Text>
          <Picker
            selectedValue={selectedSort}
            onValueChange={handleSort}
            style={[styles.picker, { backgroundColor: isDarkTheme ? '#555' : '#f0f0f0' }]} >
            <Picker.Item label="Date" value="date" />
            <Picker.Item label="Venue" value="venue" />
          </Picker>
        </View>
      </View>

      {/* Scrollable Event List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventItem 
            event={item} 
            onRegister={handleRegister} 
            isDarkTheme={isDarkTheme} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  sortContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortText: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    width: '80%',
  },
});

export default EventList;
