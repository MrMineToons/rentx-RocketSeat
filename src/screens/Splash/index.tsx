import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, runOnJS } from 'react-native-reanimated';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

import {CommonActions} from '@react-navigation/native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container,
} from './styles';


type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>;

export function Splash({ navigation }: SplashProps){
  const splashAnimation = useSharedValue(0);


  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0 ]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            "clamp"
          )
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1 ]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            "clamp"
          )
        }
      ]
    }
  });


  function startApp() {
    navigation.navigate('SignIn', {});;
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      { duration: 1500 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    )
  }, []);

  return(
    <Container>

      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>

    </Container>
  );
}
