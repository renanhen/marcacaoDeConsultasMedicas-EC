// src/screens/RegisterScreen/hooks/useRegister.ts

import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { validateRegistrationFields } from '../utils/registerUtils';

export const useRegister = () => {
  const { register } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Register'>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'PACIENTE' | 'ADMIN'>('PACIENTE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      if (!validateRegistrationFields({ name, email, password })) {
        setError('Por favor, preencha todos os campos');
        return;
      }

      await register({
        name,
        email,
        password,
        userType,
      });

      navigation.navigate('Login');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Login');
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    userType,
    setUserType,
    loading,
    error,
    handleRegister,
    handleGoBack, // Adicione a função aqui
  };
};