import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

// Interfaces de dados
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

// O Hook customizado
export const useDoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const doctorAppointments = allAppointments.filter(
          (appointment) => appointment.doctorId === user?.id
        );
        setAppointments(doctorAppointments);
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
        loadAppointments(); // Recarrega a lista
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [user]) // Adicione 'user' como dependência para carregar consultas se o usuário mudar
  );

  return {
    appointments,
    loading,
    handleUpdateStatus,
  };
};