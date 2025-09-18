import React from 'react';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { useAuth } from '../../contexts/AuthContext';
import { DoctorDashboardScreenProps } from './types';
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import AppointmentCard from './components/AppointmentCard'; // Importe o novo componente

// Importa os estilos
import {
  Container,
  ScrollContainer,
  Title,
  LoadingText,
  EmptyText,
  StyledButton,
} from './styles';
import theme from '../../styles/theme';

const DoctorDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>();
  const { appointments, loading, handleUpdateStatus } = useDoctorDashboard();

  return (
    <Container>
      <Header />
      <ScrollContainer contentContainerStyle={{ padding: 20 }}>
        <Title>Minhas Consultas</Title>

        <StyledButton>
          <Button
            title="Meu Perfil"
            onPress={() => navigation.navigate('Profile')}
            buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
          />
        </StyledButton>

        {loading ? (
          <LoadingText>Carregando consultas...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              onConfirm={(id) => handleUpdateStatus(id, 'confirmed')}
              onCancel={(id) => handleUpdateStatus(id, 'cancelled')}
            />
          ))
        )}

        <StyledButton>
          <Button
            title="Sair"
            onPress={signOut}
            buttonStyle={{ backgroundColor: theme.colors.error, paddingVertical: 12 }}
          />
        </StyledButton>
      </ScrollContainer>
    </Container>
  );
};

export default DoctorDashboardScreen;