import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password, img) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/user/signup', { firstName, lastName, email, password, img }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.status === 200) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(response.data));

        // update the auth context
        dispatch({ type: 'LOGIN', payload: response.data });

        // update loading state
        setIsLoading(false);

        // Show alert for successful signup
        window.alert('Signup successful!');

        
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        setError(data.error);
      } else {
        console.error('Error signing up:', error.message);
      }
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
