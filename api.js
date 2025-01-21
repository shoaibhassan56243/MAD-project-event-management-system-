// api.js

export const fetchMockEvents = async () => {
    try {
      const eventData = require('../assets/mockData.json'); // Adjust the path if necessary
      return eventData; // Return the data directly
    } catch (error) {
      throw new Error('Failed to load events from local data');
    }
  };
  