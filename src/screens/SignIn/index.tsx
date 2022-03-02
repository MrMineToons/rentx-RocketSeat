import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useTheme } from 'styled-components';

import {
  Container,
  Title,
  Header,
  Form,
  SubTitle,
  Footer,
} from './styles';

import { useAuth } from '../../hooks/auth';

type SignInProps = StackScreenProps<RootStackParamList, 'SignIn'>;

export function SignIn({ navigation }: SignInProps){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const theme = useTheme()

  async function handleSignIn() {
    try{
      const schema = Yup.object().shape({
        email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail valido"),
        password: Yup.string().required("A senha é obrigatória")
      })

      await schema.validate({ email, password });

      signIn({ email, password });
    }catch(e){
      if(e instanceof Yup.ValidationError){
        Alert.alert("Opa", e.message);
      }else{
        Alert.alert("Erro na autenticação", "Ocorreu um erro ao fazer login, verifique as credenciais.")
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep", {});
  }

  return(
    <KeyboardAvoidingView behavior="position" enabled style={{backgroundColor: theme.colors.background_primary, flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos {'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input iconName="mail" placeholder="E-mail" keyboardType="email-address" onChangeText={(value) => setEmail(value)} value={email}/>
            <PasswordInput iconName="lock" placeholder="Senha" keyboardType="default" onChangeText={(value) => setPassword(value)} value={password}/>
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={() => handleSignIn()}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              onPress={() => handleNewAccount()}
              enabled={true}
              loading={false}
              light
              color={theme.colors.background_secondary}
            />
          </Footer>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

}
