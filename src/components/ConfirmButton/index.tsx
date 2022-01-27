import React from 'react';
import { RectButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  Container,
  Title,
 } from './styles';


interface Props extends RectButtonProps {
  title: string;
  color: string;
}

export function ConfirmButton({
  title,
  color,
  ...rest
}: Props){
  return(
    <GestureHandlerRootView>
      <Container {...rest} color={color}>
        <Title>{title}</Title>

      </Container>
    </GestureHandlerRootView>
  );

}
