import React, { useState, useEffect } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { Container, styles, Title } from './styles';
import { CreateAppointmentScreenProps } from './types';
import { Doctor, useDoctors } from './hooks/useDoctors';
import { useAppointments } from './hooks/useAppointments';
import DateInput from './components/DateInput';
import TimeSelector from './components/TimeSelector';
import DoctorSelector from './components/DoctorSelector';

const CreateAppointmentScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<CreateAppointmentScreenProps['navigation']>();
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { doctors, loadingDoctors, error: doctorError } = useDoctors();
  const { createAppointment, loading, error: appointmentError } = useAppointments();
  const handleCreateAppointment = async () => {
    const success = await createAppointment({
      user,
      date,
      time: selectedTime,
      doctor: selectedDoctor,
    });

    if (success) {
      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    }
  };

  return (
  <Container>
    <Header />
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Title>Agendar Consulta</Title>

      <DateInput value={date} onChange={setDate} />
      <TimeSelector selectedTime={selectedTime} onSelect={setSelectedTime} />
      <DoctorSelector
        doctors={doctors}
        loading={loadingDoctors}
        selectedDoctor={selectedDoctor}
        onSelect={setSelectedDoctor}
        error={doctorError}
      />

        <Button
          title="Agendar"
          onPress={handleCreateAppointment}
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
    </ScrollView>
  </Container>
  );
};

export default CreateAppointmentScreen;