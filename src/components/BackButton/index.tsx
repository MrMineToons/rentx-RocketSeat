import React from 'react';
import { BorderlessButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';


import {
  Container,
 } from './styles';

interface Props extends BorderlessButtonProps{
  color: string;
}

export function BackButton({color, ...rest}: Props){
  const theme = useTheme();

  return(
    <GestureHandlerRootView>
      <Container {...rest}>
        <MaterialIcons
          name="chevron-left"
          size={35}
          color={color ? color: theme.colors.text}
        />
      </Container>
    </GestureHandlerRootView>
  );
}
