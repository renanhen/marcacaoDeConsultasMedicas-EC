import React from 'react'
import { LoginCredentials } from '../../../types/auth';


export function useHandleLogin(setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>, signIn: (credentials: LoginCredentials) => Promise<void>, email: string, password: string) {
  return async () => {
    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };
}
