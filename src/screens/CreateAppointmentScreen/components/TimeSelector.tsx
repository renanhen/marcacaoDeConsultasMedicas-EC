// components/TimeSelector.tsx
import React from 'react';
import { Text } from 'react-native';
import TimeSlotList from '../../../components/TimeSlotList';


type Props = {
  selectedTime: string;
  onSelect: (time: string) => void;
};

export default function TimeSelector({ selectedTime, onSelect }: Props) {
  return (
    <>
      <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>Selecione um Horário</Text>
      <TimeSlotList onSelectTime={onSelect} selectedTime={selectedTime} />
    </>
  );
}
