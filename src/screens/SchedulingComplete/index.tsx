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

export function SchedulingComplete({ navigation }: HomeProps){
  const theme = useTheme();
  const { width } = useWindowDimensions();
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
        <Title> Carro Alugado! </Title>
        <Message>
          Agora você só precisar ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' color={theme.colors.success} onPress={() => {navigation.navigate('Home', {})}} />
      </Footer>
    </Container>
  );

}
