import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const FeedbackForm = ({ event, onSubmitFeedback }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please provide a rating.');
      return;
    }

    const feedback = { eventId: event.id, rating, comments };
    onSubmitFeedback(feedback);
    Alert.alert('Success', 'Thank you for your feedback!');
    setRating(0);
    setComments('');
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Feedback for {event.name}</Text>
      <Text style={styles.label}>Rating (1-5):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter rating (1 to 5)"
        keyboardType="numeric"
        value={rating.toString()}
        onChangeText={(text) => setRating(Number(text))}
      />
      <Text style={styles.label}>Comments:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Write your comments here"
        value={comments}
        onChangeText={setComments}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit Feedback" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
});

export default FeedbackForm;
