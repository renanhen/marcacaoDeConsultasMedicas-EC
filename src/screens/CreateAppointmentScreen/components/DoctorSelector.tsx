// components/DoctorSelector.tsx
import React from 'react';
import { Text } from 'react-native';
import { Doctor } from '../hooks/useDoctors';
import DoctorList from '../../../components/DoctorList';

type Props = {
  doctors: Doctor[];
  loading: boolean;
  selectedDoctor: Doctor | null;
  onSelect: (doctor: Doctor) => void;
  error?: string | null;
};

export default function DoctorSelector({ doctors, loading, selectedDoctor, onSelect, error }: Props) {
  return (
    <>
      <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>Selecione um Médico</Text>
      {loading ? (
        <Text>Carregando médicos...</Text>
      ) : (
        <DoctorList doctors={doctors} onSelectDoctor={onSelect} selectedDoctorId={selectedDoctor?.id} />
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </>
  );
}
