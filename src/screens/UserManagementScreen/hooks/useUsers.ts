import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';


export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

export const useUsers = (currentUserId?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        setUsers(allUsers.filter(u => u.id !== currentUserId));
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        const updatedUsers = allUsers.filter(u => u.id !== userId);
        await AsyncStorage.setItem('@MedicalApp:users', JSON.stringify(updatedUsers));
        loadUsers();
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }, [loadUsers]);

  // Carrega sempre que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  return { users, loading, loadUsers, deleteUser };
};