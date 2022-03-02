import React, { useState, useEffect } from 'react';

import { useTheme } from 'styled-components' ;
import { StatusBar, FlatList } from 'react-native';

import { Car } from '../../components/Car'
import { Car as ModelCar } from '../../database/model/Car';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';
import { format, parseISO } from 'date-fns';

import { AntDesign } from '@expo/vector-icons';


import api from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';

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
import { useIsFocused } from '@react-navigation/native';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

type MyCarsProps = StackScreenProps<RootStackParamList, 'MyCars'>;

export function MyCars({ navigation }: MyCarsProps){
  const theme = useTheme();
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const screenIsFocus = useIsFocused();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/rentals');
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          }
        });

        setCars(dataFormatted);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

  fetchCars();
}, [screenIsFocus]);

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

      { loading ? <LoadAnimation /> :
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
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
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
