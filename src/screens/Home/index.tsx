import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
 } from './styles';

type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

export function Home({ navigation }: HomeProps) {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        try{
          const user = changes.users;
          await api.post('/users/sync', user);
        }catch(e){
          console.log(e);
        }
        
      },
    });
  }

useEffect (() => {
  let isMounted = true;

  async function fetchCars() {
    try {
      console.log("Montando!");
      const carCollection = database.get<ModelCar>('cars');
      // console.log(carCollection);
      const carstemp = await carCollection.query().fetch();
      if(isMounted){
        setCars(carstemp);
      }
    } catch (error){
        console.log(error);
    } finally{
      if(isMounted) {
        setLoading(false);
      }
    }
  };

  fetchCars();
  console.log("Executado efeito 1");

  return () => {
    isMounted = false;
  };
},[]);

useEffect(() => {
  if(netInfo.isConnected && !synchronizing.current){
    try{
      console.log("Sincronizando!");
      synchronizing.current = true;
      offlineSynchronize();
    }catch(e){
      console.log(e);
    }finally {
      synchronizing.current = false;
    }
  }
  console.log("Executado efeito 2");

},[netInfo.isConnected]);


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
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      { loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }: { item: ModelCar }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

    </Container>
  );

}
