import axios from 'axios';

export const getQuotes = async () => {
  try {
    const response = await axios.get('https://seahorse-app-wn5zq.ondigitalocean.app/eliashovdenes-mydotnetbackend/Quotes');
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
};