import React from 'react';
import { Button, ListItem, Text } from 'react-native-elements';

// Importa os estilos já criados
import {
  StyledAppointmentCard,
  StatusBadge,
  StatusText,
  ButtonRow,
  PatientNameText,
  DateTimeText,
  SpecialtyText,
  StyledActionButton,
} from '../styles';
import theme from '../../../styles/theme';
import { getStatusText } from '../utils/appointmentUtils';

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

interface AppointmentCardProps {
  appointment: Appointment;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onConfirm, onCancel }) => {
  return (
    <StyledAppointmentCard>
      <ListItem.Content>
        <PatientNameText>
          Paciente: {appointment.patientName || 'Nome não disponível'}
        </PatientNameText>
        <DateTimeText>
          {appointment.date} às {appointment.time}
        </DateTimeText>
        <SpecialtyText>
          {appointment.specialty}
        </SpecialtyText>
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
        {appointment.status === 'pending' && (
          <ButtonRow>
            <StyledActionButton>
              <Button
                title="Confirmar"
                onPress={() => onConfirm(appointment.id)}
                buttonStyle={{ backgroundColor: theme.colors.success, paddingVertical: 8 }}
              />
            </StyledActionButton>
            <StyledActionButton>
              <Button
                title="Cancelar"
                onPress={() => onCancel(appointment.id)}
                buttonStyle={{ backgroundColor: theme.colors.error, paddingVertical: 8 }}
              />
            </StyledActionButton>
          </ButtonRow>
        )}
      </ListItem.Content>
    </StyledAppointmentCard>
  );
};

export default AppointmentCard;