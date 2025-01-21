import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const EventManagementScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title Box with 'EVENT MANAGEMENT' on the first line and 'SYSTEM' on the second line */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>EVENT MANAGEMENT</Text>
        <Text style={styles.system}>SYSTEM</Text>
      </View>

      {/* Buttons with the new color */}
      <View style={styles.buttonContainer}>
        <Button
          title="Events"
          color="#FF737D" // Button color changed to #FF737D
          onPress={() => navigation.navigate('Events')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="About Us"
          color="#FF737D" // Button color changed to #FF737D
          onPress={() => navigation.navigate('AboutUs')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',      // Centers content horizontally
    backgroundColor: '#3D2F68', // Background color (#3D2F68)
    padding: 20,
  },
  titleBox: {
    width: '90%', // Increased width for the title box from left and right
    backgroundColor: '#2A1A4F', // Slightly darker shade of background color for the title box
    paddingVertical: 30, // Padding for top and bottom (height of the box remains as before)
    borderRadius: 10, // Rounded corners for the title box
    shadowColor: '#0D47A1', // Blue shadow for the title box
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // Elevation for Android shadow effect
    textAlign: 'center',  // Ensures text is centered inside the box
    justifyContent: 'center', // Centers the text vertically
    alignItems: 'center', // Centers the text horizontally
  },
  title: {
    fontSize: 26, // Title text size
    fontWeight: 'bold',
    color: '#ffffff', // White text color for the title
    textTransform: 'uppercase', // Uppercase for the title text
    marginBottom: 5, // Space between EVENT MANAGEMENT and SYSTEM
  },
  system: {
    fontSize: 26, // SYSTEM text size (same as EVENT MANAGEMENT)
    fontWeight: 'bold',
    color: '#ffffff', // White text color for SYSTEM
    textTransform: 'uppercase', // SYSTEM in uppercase
  },
  buttonContainer: {
    marginVertical: 10, // Space between buttons
    width: '80%',       // Make buttons a bit narrower
    borderRadius: 8,    // Rounded corners for buttons
    overflow: 'hidden', // Ensure rounded corners are visible for button text
    elevation: 4,       // Add shadow for buttons for depth
  },
});

export default EventManagementScreen;
