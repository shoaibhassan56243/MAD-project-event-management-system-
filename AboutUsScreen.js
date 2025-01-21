import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Heading with box */}
      <View style={styles.headingBox}>
        <Text style={styles.title}>ABOUT US</Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          We are the team behind the Event Management System for the school. Our goal is to streamline event organization, making it easier for students and staff to stay up-to-date on upcoming events. We aim to bring together the school community with exciting events and activities.
        </Text>
      </View>

      {/* Image Section (after the text) */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/W.jpeg')}  // Ensure the correct path to the image
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#3D2F68',  // Main screen background color
    padding: 20,
    justifyContent: 'flex-start',  // Keep content at the top
    alignItems: 'center',
  },
  headingBox: {
    backgroundColor: '#FF737D',  // Soft pink background color
    paddingVertical: 8,  // Reduced vertical padding to make the box more compact
    paddingHorizontal: 80,  // Horizontal padding to maintain width
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',  // Matches the button length
    alignItems: 'center',  // Ensures the text is centered inside the box
  },
  title: {
    fontSize: 24,  // Font size for the heading
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',  // Uppercase text
    textAlign: 'center',  // Center the title in the box
    whiteSpace: 'nowrap',  // Prevent the text from wrapping to next line
  },
  contentContainer: {
    width: '100%',
    padding: 15,
  },
  contentText: {
    fontSize: 16,
    color: '#ffffff',  // White text for content
    lineHeight: 22,
    textAlign: 'justify',  // Justify text to spread evenly
  },
  imageContainer: {
    width: '100%',
    marginTop: 20,  // Space between content and image
    alignItems: 'center',  // Center the image horizontally
  },
  image: {
    width: 275,  // Adjusted image width to make it larger
    height: 275,  // Adjusted image height to make it larger
    borderRadius: 10,  // Optional: add rounded corners to the image
  },
});

export default AboutUsScreen;


