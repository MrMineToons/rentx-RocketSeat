import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
 } from './styles';



export function Home(){
  const carData = {
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao Dia',
      price: 120,
    },
    thumbnail: 'https://1.bp.blogspot.com/-i3epqLLAcNA/WU1-4y3DWnI/AAAAAAACmDs/GnSbyeeS-Ggbt4NuDnh5iWDfWZqC65CKACLcBGAs/s1600/audi_rs_5_coupe_76.jpg'
  }

  const carDataTwo = {
    brand: 'Porche',
    name: 'Panarema',
    rent: {
      period: 'Ao Dia',
      price: 120,
    },
    thumbnail: 'https://revistacarro.com.br/wp-content/uploads/2020/10/panamera-hibrido-2.jpg'
  }
  return(
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carData}/>
      <Car data={carDataTwo}/>
    </Container>
  );

}
