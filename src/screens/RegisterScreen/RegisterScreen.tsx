import React from 'react';
import { useRegister } from './hooks/useRegister';
import RegisterForm from './components/RegisterForm'; // Importe o novo componente de formulário

import {
  Container,
  Title,
} from './styles';

const RegisterScreen: React.FC = () => {
  const {
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
  } = useRegister();

  return (
    <Container>
      <Title>Cadastro de Usuário</Title>
      
      {}
      <RegisterForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        userType={userType}
        setUserType={setUserType}
        loading={loading}
        error={error}
        handleRegister={handleRegister}
        handleGoBack={handleGoBack}
      />
    </Container>
  );
};

export default RegisterScreen;