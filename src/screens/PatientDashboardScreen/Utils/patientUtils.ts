import theme from "react-native-elements/dist/config/theme";

/**
 * Retorna o texto de status formatado com base no status da consulta.
 * @param status O status da consulta ('pending', 'confirmed', 'cancelled').
 * @returns O texto correspondente ao status.
 */
export const getStatusText = (status: string): string => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

/**
 * Retorna a cor do tema correspondente ao status da consulta.
 * @param status O status da consulta ('pending', 'confirmed', 'cancelled').
 * @returns A cor do tema.
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};