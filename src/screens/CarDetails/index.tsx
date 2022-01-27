import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../Utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
 } from './styles';

 interface Params {
   car: CarDTO;
 }

type HomeProps = StackScreenProps<RootStackParamList, 'CarDetails'>;

export function CarDetails({ navigation }: HomeProps){
  const route = useRoute();
  const { car } = route.params as Params;
  return(
    <Container>
      <Header>
        <BackButton onPress={() => {navigation.goBack()}} color=''/>
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }

        </Accessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período de aluguel" color='' onPress={() => {navigation.navigate('Scheduling', { car })}}/>
      </Footer>
    </Container>
  );
}
