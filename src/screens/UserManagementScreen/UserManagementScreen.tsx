import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { Container, Title, UserCard, LoadingText, EmptyText, RoleBadge, RoleText, ButtonContainer, styles, RoleProps,
} from './users';
import { useUsers } from './hooks/useUsers';
import { getRoleText } from './utils/userHelpers';


const UserManagementScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { users, loading, deleteUser } = useUsers(user?.id);

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Gerenciar Usuários</Title>

        <Button
          title="Adicionar Novo Usuário"
          onPress={() => {}}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        {loading ? (
          <LoadingText>Carregando usuários...</LoadingText>
        ) : users.length === 0 ? (
          <EmptyText>Nenhum usuário cadastrado</EmptyText>
        ) : (
          users.map(u => (
            <UserCard key={u.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.userName}>{u.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.userEmail}>{u.email}</ListItem.Subtitle>
                <RoleBadge role={u.role as RoleProps['role']}>
                  <RoleText role={u.role as RoleProps['role']}>{getRoleText(u.role)}</RoleText>
                </RoleBadge>
                <ButtonContainer>
                  <Button
                    title="Editar"
                    onPress={() => {}}
                    containerStyle={styles.actionButton}
                    buttonStyle={styles.editButton}
                  />
                  <Button
                    title="Excluir"
                    onPress={() => deleteUser(u.id)}
                    containerStyle={styles.actionButton}
                    buttonStyle={styles.deleteButton}
                  />
                </ButtonContainer>
              </ListItem.Content>
            </UserCard>
          ))
        )}

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button}
          buttonStyle={styles.backButton}
        />
      </ScrollView>
    </Container>
  );
};

export default UserManagementScreen;