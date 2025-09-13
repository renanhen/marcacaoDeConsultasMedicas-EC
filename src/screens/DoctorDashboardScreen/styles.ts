import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';
import theme from '../../styles/theme';

interface StyledProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const StyledAppointmentCard = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const PatientNameText = styled(ListItem.Title)`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const DateTimeText = styled(ListItem.Subtitle)`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

export const SpecialtyText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text};
`;

export const StyledButton = styled.View`
  margin-bottom: 20px;
  width: 100%;
`;

export const StyledActionButton = styled.View`
  margin-top: 8px;
  width: 48%;
`;