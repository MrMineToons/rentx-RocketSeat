import React, { useState } from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Confirmation } from '../../Confirmation';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { useTheme } from 'styled-components';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../@types/navigation';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
 } from './styles';
import { string } from 'yup/lib/locale';

import api from '../../../services/api';


interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

type SignUpSecondStepProps = StackScreenProps<RootStackParamList, 'SignUpSecondStep'>;

export function SignUpSecondStep({ route, navigation }: SignUpSecondStepProps){
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { user } = route.params as Params;

  function handleBack(){
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert("Informe a senha e a confirmação");
    }

    if(password != passwordConfirm){
      return Alert.alert("As senha não são iguais");
    }


    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`
      });
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Opa', 'Não foi possivel cadastrar')
    });
    // Enviar para API e cadastrar.
  }

  return(
    <KeyboardAvoidingView behavior="position" enabled>
        <Container>
          <Header>
            <BackButton onPress={handleBack} color=""/>
            <Steps>
              <Bullet active={false}/>
              <Bullet active={true}/>
            </Steps>

            
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              keyboardType="default"
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput 
              iconName="lock"
              placeholder="Repetir Senha"
              keyboardType="default"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button 
            color={theme.colors.success}
            title="Proximo"
            onPress={handleRegister}
          />
        </Container>
    </KeyboardAvoidingView>
  );

}
