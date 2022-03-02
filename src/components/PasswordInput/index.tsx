import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInputProps } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  IconContainer,
  InputText,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value?: string;
}


export function PasswordInput({iconName, placeholder, keyboardType, value, ...rest}: InputProps){
  const theme = useTheme()
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setisFilled(!!value)
  }


  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return(
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}/>
      </IconContainer>

      <InputText placeholder={placeholder} autoCorrect={false} keyboardType={keyboardType} autoCapitalize="none" secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer style={{ marginRight: 0 }}>
          <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} colors={theme.colors.text_detail}/>
        </IconContainer>
      </BorderlessButton>


    </Container>
  );

}
