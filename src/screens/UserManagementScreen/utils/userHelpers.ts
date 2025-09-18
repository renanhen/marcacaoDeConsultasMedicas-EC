import { UserRole } from "../../../types/auth";

export const getRoleText = (role: UserRole) => {
  switch (role) {
    case 'admin': return 'Administrador';
    case 'doctor': return 'Médico';
    case 'patient': return 'Paciente';
  }
};
