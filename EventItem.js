import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, Alert, ImageBackground } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventItem = ({ event, isDarkTheme }) => {
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('1');  // Default rating to 1
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status

  const handleFeedbackSubmit = () => {
    // Logic to submit the feedback (e.g., save to backend or store locally)
    setIsFeedbackSubmitted(true);  // Change state to indicate feedback has been submitted
    setIsFeedbackModalVisible(false);  // Close the feedback modal
    alert('Feedback submitted successfully!');
  };

  const handleRegisterSubmit = async () => {
    if (!userName || !userEmail) {
      Alert.alert('Error', 'Please provide both your name and email.');
      return;
    }

    try {
      const registeredEvents = JSON.parse(await AsyncStorage.getItem('registeredEvents')) || [];
      await AsyncStorage.setItem(
        'registeredEvents',
        JSON.stringify([...registeredEvents, { ...event, userName, userEmail }])
      );
      setIsRegistered(true); // Mark as registered
      Alert.alert('Success', 'You have successfully registered for this event!');
      setIsRegistrationModalVisible(false);  // Close registration modal
    } catch (error) {
      Alert.alert('Error', 'Failed to register for the event.');
    }
  };

  // Check if event is past or future
  const isPastEvent = event.date < new Date().toISOString().split('T')[0];

  return (
    <View style={styles.eventContainer}>
      {/* Check if the event is "Music Festival" to use image as background */}
      {event.name === "Music Festival" ? (
        <ImageBackground
          source={require('../assets/HR.jpeg')} // Your image for Music Festival (JPG format)
          style={styles.eventBackground}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: isDarkTheme ? 'white' : 'black' }]}>
              {event.name}
            </Text>
            <Text style={[styles.details, { color: isDarkTheme ? 'white' : 'black' }]}>
              Date: {event.date}
            </Text>
            <Text style={[styles.details, { color: isDarkTheme ? 'white' : 'black' }]}>
              Venue: {event.venue}
            </Text>
            <Text style={[styles.description, { color: isDarkTheme ? 'white' : 'black' }]}>
              {event.description}
            </Text>

            {/* Register button visible only if the event hasn't passed */}
            {event.date >= new Date().toISOString().split('T')[0] && !isRegistered && (
              <Button title="Register" onPress={() => setIsRegistrationModalVisible(true)} />
            )}

            {/* Show "Registered" message after registration */}
            {isRegistered && (
              <Text style={styles.feedbackStatus}>Registered</Text>
            )}

            {/* Show feedback button after event is completed */}
            {isPastEvent && !isFeedbackSubmitted && (
              <Button title="Give Feedback" onPress={() => setIsFeedbackModalVisible(true)} />
            )}
            {/* Display feedback submitted message if feedback has been submitted */}
            {isPastEvent && isFeedbackSubmitted && (
              <Text style={styles.feedbackStatus}>Feedback Submitted</Text>
            )}
          </View>
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.container,
            {
              backgroundColor: isPastEvent ? '#f0f0f0' : event.themeColor || '#ddd',
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: isDarkTheme ? 'white' : 'black' }]}>
              {event.name}
            </Text>
            <Text style={[styles.details, { color: isDarkTheme ? 'white' : 'black' }]}>
              Date: {event.date}
            </Text>
            <Text style={[styles.details, { color: isDarkTheme ? 'white' : 'black' }]}>
              Venue: {event.venue}
            </Text>
            <Text style={[styles.description, { color: isDarkTheme ? 'white' : 'black' }]}>
              {event.description}
            </Text>

            {/* Register button visible only if the event hasn't passed */}
            {event.date >= new Date().toISOString().split('T')[0] && !isRegistered && (
              <Button title="Register" onPress={() => setIsRegistrationModalVisible(true)} />
            )}

            {/* Show "Registered" message after registration */}
            {isRegistered && (
              <Text style={styles.feedbackStatus}>Registered</Text>
            )}

            {/* Show feedback button after event is completed */}
            {isPastEvent && !isFeedbackSubmitted && (
              <Button title="Give Feedback" onPress={() => setIsFeedbackModalVisible(true)} />
            )}
            {/* Display feedback submitted message if feedback has been submitted */}
            {isPastEvent && isFeedbackSubmitted && (
              <Text style={styles.feedbackStatus}>Feedback Submitted</Text>
            )}
          </View>
        </View>
      )}

      {/* Registration Modal */}
      <Modal
        visible={isRegistrationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsRegistrationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register for {event.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={userEmail}
              onChangeText={setUserEmail}
            />
            <Button title="Submit" onPress={handleRegisterSubmit} />
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        visible={isFeedbackModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFeedbackModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>FEEDBACK</Text>

            {/* Rating Picker */}
            <Text style={styles.feedbackLabel}>Rate the Event:</Text>
            <Picker
              selectedValue={rating}
              style={styles.picker}
              onValueChange={(itemValue) => setRating(itemValue)}
            >
              <Picker.Item label="1 - Poor" value="1" />
              <Picker.Item label="2 - Fair" value="2" />
              <Picker.Item label="3 - Good" value="3" />
              <Picker.Item label="4 - Very Good" value="4" />
              <Picker.Item label="5 - Excellent" value="5" />
            </Picker>

            {/* Feedback Input */}
            <TextInput
              style={styles.feedbackInput}
              placeholder="Enter your feedback here..."
              value={feedback}
              onChangeText={setFeedback}
            />

            {/* Submit Button */}
            <Button title="Submit" onPress={handleFeedbackSubmit} />
            {isFeedbackSubmitted && <Text style={styles.feedbackStatus}>Feedback Submitted</Text>}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: '100%',
    marginBottom: 15,
  },
  eventBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to make text readable
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,  // Ensure text stays above the background image
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent overlay
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  feedbackInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    width: '100%',
  },
  feedbackStatus: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    width: '100%',
  },
});

export default EventItem;
