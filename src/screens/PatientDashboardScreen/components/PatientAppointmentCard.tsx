// src/screens/PatientDashboardScreen/components/PatientAppointmentCard.tsx

import React from 'react';
import { ListItem, Text } from 'react-native-elements';

import {
  StyledAppointmentCard,
  StatusBadge,
  StatusText,
  PatientNameText,
  DateTimeText,
  DoctorNameText,
  SpecialtyText,
} from '../styles';
import { getStatusText } from '../Utils/patientUtils';

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

interface PatientAppointmentCardProps {
  appointment: Appointment;
}

const PatientAppointmentCard: React.FC<PatientAppointmentCardProps> = ({ appointment }) => {
  return (
    <StyledAppointmentCard>
      <ListItem.Content>
        <PatientNameText>
          Paciente: {appointment.patientName}
        </PatientNameText>
        <DateTimeText>
          {appointment.date} às {appointment.time}
        </DateTimeText>
        <DoctorNameText>
          {appointment.doctorName}
        </DoctorNameText>
        <SpecialtyText>
          {appointment.specialty}
        </SpecialtyText>
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
      </ListItem.Content>
    </StyledAppointmentCard>
  );
};

export default PatientAppointmentCard;