// src/screens/PatientDashboardScreen/index.tsx

import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import theme from '../../styles/theme';
import PatientAppointmentCard from './components/PatientAppointmentCard'; // Importe o novo componente

// Importa os estilos do novo arquivo
import {
  Container,
  ScrollContainer,
  ScrollContentContainer,
  Title,
  LoadingText,
  EmptyText,
  StyledButtonContainer,
} from './styles';

type PatientDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PatientDashboard'>;
};

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const PatientDashboardScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<PatientDashboardScreenProps['navigation']>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const userAppointments = allAppointments.filter(
          (appointment) => appointment.patientId === user?.id
        );
        setAppointments(userAppointments);
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [])
  );

  return (
    <Container>
      <Header />
      <ScrollContainer>
        <ScrollContentContainer>
          <Title>Minhas Consultas</Title>

          <StyledButtonContainer>
            <Button
              title="Agendar Nova Consulta"
              onPress={() => navigation.navigate('CreateAppointment')}
              buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
            />
          </StyledButtonContainer>

          <StyledButtonContainer>
            <Button
              title="Meu Perfil"
              onPress={() => navigation.navigate('Profile')}
              buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
            />
          </StyledButtonContainer>

          {loading ? (
            <LoadingText>Carregando consultas...</LoadingText>
          ) : appointments.length === 0 ? (
            <EmptyText>Nenhuma consulta agendada</EmptyText>
          ) : (
            appointments.map((appointment) => (
              <PatientAppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}

          <StyledButtonContainer>
            <Button
              title="Sair"
              onPress={signOut}
              buttonStyle={{ backgroundColor: theme.colors.error, paddingVertical: 12 }}
            />
          </StyledButtonContainer>
        </ScrollContentContainer>
      </ScrollContainer>
    </Container>
  );
};

export default PatientDashboardScreen;