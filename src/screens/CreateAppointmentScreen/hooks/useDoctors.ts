import { useEffect, useState } from 'react';
import { authApiService } from '../../../services/authApi';
import { User } from '../../../types/auth';


export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}
  // Estados para dados da API
export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);
      setError('');
      const doctorsData: User[] = await authApiService.getAllDoctors();
      setDoctors(convertUsersToDoctors(doctorsData));
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      setError('Erro ao carregar médicos da API. Tentando novamente...');
      // Retry após 1s
      setTimeout(async () => {
        try {
          const doctorsData: User[] = await authApiService.getAllDoctors();
          setDoctors(convertUsersToDoctors(doctorsData));
          setError('');
        } catch {
          setError('Médicos carregados com dados locais (API indisponível)');
        }
      }, 1000);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const convertUsersToDoctors = (users: User[]): Doctor[] => {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      specialty: user.role === 'doctor' && 'specialty' in user 
        ? user.specialty 
        : 'Especialidade não informada',
      image: user.image
    }));
  };

  return { doctors, loadingDoctors, error, reload: loadDoctors };
}
