import React from 'react';
import { Input, Button } from 'react-native-elements';
import theme from '../../../styles/theme';
import UserTypeSelector from './UserTypeSelector';

import {
  ErrorText,
  StyledButtonContainer,
  StyledInputContainer,
} from '../styles';

interface RegisterFormProps {
  name: string;
  setName: (text: string) => void;
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  userType: 'PACIENTE' | 'ADMIN';
  setUserType: (type: 'PACIENTE' | 'ADMIN') => void;
  loading: boolean;
  error: string | null;
  handleRegister: () => void;
  handleGoBack: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
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
  handleGoBack,
}) => {
  return (
    <>
      <StyledInputContainer>
        <Input
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </StyledInputContainer>

      <UserTypeSelector userType={userType} setUserType={setUserType} />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <StyledButtonContainer>
        <Button
          title="Cadastrar"
          onPress={handleRegister}
          loading={loading}
          buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
        />
      </StyledButtonContainer>

      <StyledButtonContainer>
        <Button
          title="Voltar para Login"
          onPress={handleGoBack}
          buttonStyle={{ backgroundColor: theme.colors.secondary, paddingVertical: 12 }}
        />
      </StyledButtonContainer>
    </>
  );
};

export default RegisterForm;