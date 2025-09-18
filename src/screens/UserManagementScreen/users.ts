// src/screens/UserManagementScreen/styles.ts
import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';
import theme from '../../styles/theme';
import { TextStyle, ViewStyle } from 'react-native';

// Interfaces para tipagem das props customizadas
export interface RoleProps {
  role: 'admin' | 'doctor' | 'patient';
}

// Container da tela
export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

// Título da tela
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

// Card do usuário
export const UserCard = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

// Textos de loading ou vazio
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

// Badge de função
export const RoleBadge = styled.View<RoleProps>`
  background-color: ${(props: { role: any; }) => {
    switch (props.role) {
      case 'admin':
        return theme.colors.primary + '20';
      case 'doctor':
        return theme.colors.success + '20';
      default:
        return theme.colors.secondary + '20';
    }
  }};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

// Texto dentro da badge
export const RoleText = styled.Text<RoleProps>`
  color: ${(props: { role: any; }) => {
    switch (props.role) {
      case 'admin':
        return theme.colors.primary;
      case 'doctor':
        return theme.colors.success;
      default:
        return theme.colors.secondary;
    }
  }};
  font-size: 12px;
  font-weight: 500;
`;

// Container dos botões "Editar" e "Excluir"
export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

// Styles em objeto para componentes do react-native-elements
export const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  } as ViewStyle,
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  } as ViewStyle,
  backButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  } as ViewStyle,
  actionButton: {
    marginTop: 8,
    width: '48%',
  } as ViewStyle,
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
  } as ViewStyle,
  deleteButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  } as ViewStyle,
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  } as TextStyle,
  userEmail: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  } as TextStyle,
};
