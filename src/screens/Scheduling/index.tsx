import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';

import { format } from 'date-fns';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';
import { useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/carDTO';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';
import { getPlatformDate } from '../../Utils/getPlatformDate';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
 } from './styles';

type HomeProps = StackScreenProps<RootStackParamList, 'Scheduling'>;

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling({ navigation }: HomeProps){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental(){
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    });
  };

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    };

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

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

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={() => handleConfirmRental()} enabled={!!rentalPeriod.startFormatted}/>
      </Footer>

    </Container>
  );

}
