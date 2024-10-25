import axios from 'axios';

export const getQuotes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/Quotes');
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
};