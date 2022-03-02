import React, { useState } from 'react';
import { Alert, KeyboardTypeOptions, TextInputProps } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value?: string;
}


export function Input({iconName, placeholder, keyboardType, value, ...rest}: InputProps){
  const theme = useTheme()
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setisFilled(!!value)
  }

  return(
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}/>
      </IconContainer>

      <InputText placeholder={placeholder} autoCorrect={false} keyboardType={keyboardType} autoCapitalize="none" {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
      />

    </Container>
  );

}
