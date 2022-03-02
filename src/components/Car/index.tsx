import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import { Car as ModelCar } from '../../database/model/Car';
import { useNetInfo } from '@react-native-community/netinfo';
import { getAccessoryIcon } from '../../Utils/getAccessoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
 } from './styles';


interface Props extends RectButtonProps {
  data: ModelCar;
}

export function Car({ data, ...rest } : Props){
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  const netInfo = useNetInfo();

  return(
    <GestureHandlerRootView>
      <Container {...rest}>
        <Details>
          <Brand>{data.brand}</Brand>
          <Name>{data.name}</Name>

          <About>
            <Rent>
              <Period>{data.period}</Period>
              <Price>{`R$ ${netInfo.isConnected === true ? data.price : '...' }`}</Price>
            </Rent>

            <Type>
              <MotorIcon />
            </Type>
          </About>
        </Details>

        <CarImage
        source={{ uri: data.thumbnail }}
        resizeMode="contain"
        />
      </Container>
    </GestureHandlerRootView>
  );

}
