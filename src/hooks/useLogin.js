import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:3001/api/user/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 200) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(response.data))

        // update the auth context
        dispatch({ type: 'LOGIN', payload: response.data })

        // update loading state
        setIsLoading(false)
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response
        setError(data.error)
      } else {
        console.error('Error logging in:', error.message)
      }
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
