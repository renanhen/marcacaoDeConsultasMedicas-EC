// components/DateInput.tsx
import React from 'react';
import { Input } from 'react-native-elements';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function DateInput({ value, onChange }: Props) {
  return (
    <Input
      placeholder="Data (DD/MM/AAAA)"
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      containerStyle={{ marginBottom: 10 }}
    />
  );
}
