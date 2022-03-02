import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Title,
  Content,
  Message,
  Footer,
 } from './styles';


type HomeProps = StackScreenProps<RootStackParamList, 'SchedulingComplete'>;

interface Params{
  title: string;
  message: string;
  nextScreenRoute: keyof RootStackParamList;
}

export function Confirmation({ navigation, route }: HomeProps){
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute, {})
  }
  return(
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width}/>

      <Content>
        <DoneSvg />
        <Title>{title}</Title>
        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' color={theme.colors.success} onPress={handleConfirm} />
      </Footer>
    </Container>
  );

}
