import React, { useState } from 'react';
import axios from 'axios';

const RandomNumber = ({ onFetchNumber }) => {
  const [loading, setLoading] = useState(false);

  const fetchRandomNumber = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/random');
      onFetchNumber(response.data.value); // Envia el número al componente padre
    } catch (error) {
      console.error('Error fetching the random number', error);
    } finally {
      setLoading(false);
    }
  };

  // Deja de renderizar el botón
  return null;
};

export default RandomNumber;
