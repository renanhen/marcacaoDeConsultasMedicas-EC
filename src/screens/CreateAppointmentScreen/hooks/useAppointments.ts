import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Doctor } from './useDoctors';
import { User } from '../../../types/auth';

export interface Appointment {
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

export function useAppointments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createAppointment = async ({
    user,
    date,
    time,
    doctor,
  }: {
    user: User | null;
    date: string;
    time: string;
    doctor: Doctor | null;
  }) => {
    try {
      setLoading(true);
      setError('');

      if (!date || !time || !doctor) {
        setError('Por favor, preencha a data e selecione um médico e horário');
        return false;
      }

      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        patientName: user?.name || '',
        doctorId: doctor.id,
        doctorName: doctor.name,
        date,
        time,
        specialty: doctor.specialty,
        status: 'pending',
      };

      appointments.push(newAppointment);
      await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));

      return true;
    } catch (err) {
      setError('Erro ao salvar consulta. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createAppointment, loading, error };
}