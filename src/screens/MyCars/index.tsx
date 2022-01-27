import React, { useState, useEffect } from 'react';

import { useTheme } from 'styled-components' ;
import { StatusBar, FlatList } from 'react-native';

import { Car } from '../../components/Car'
import { CarDTO } from '../../dtos/carDTO';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

import { AntDesign } from '@expo/vector-icons';


import api from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';

import {
  Container,
  Title,
  SubTitle,
  Header,
  Content,
  Appointments,
  AppointimentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

type MyCarsProps = StackScreenProps<RootStackParamList, 'MyCars'>;

export function MyCars({ navigation }: MyCarsProps){
  const theme = useTheme();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

  fetchCars();
}, []);

  return(
    <Container>
      <Header>
        <BackButton onPress={() => {navigation.goBack()}} color={theme.colors.shape} style={{marginTop: 30}}/>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      { loading ? <Load /> :
        <Content>
          <Appointments>
            <AppointimentsTitle>Agendamentos Feitos</AppointimentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );

}
