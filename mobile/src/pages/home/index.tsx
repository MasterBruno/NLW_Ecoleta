import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]);
  const [selectedUfs, setSelectedUfs] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setUfs(response.data.map(uf => uf.sigla));
      })
  }, []);

  useEffect(() => {
    if (selectedUfs === '0') return;

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUfs}/municipios`)
    .then(response => {
      setCitys(response.data.map(uf => uf.nome));
    })
  }, [selectedUfs])

  function handleNavigateToMap() {
    navigation.navigate('Points', {uf: selectedUfs, city: selectedCity});
  }

  function handleSelectUf(uf: string) {
    setSelectedUfs(uf);
  }

  function handleSelectCity(city: string) {
    setSelectedCity(city);
  }

  return(
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')}/>
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            onValueChange={(value) => handleSelectUf(value)}
            placeholder={{ label: 'Selecione uma UF', value: 0}}
            value={selectedUfs}
            style={styles.select}
            items={
              ufs.map(uf => (
                { label: uf, value: uf, key: uf }
              ))
            }
          />
          <RNPickerSelect
            onValueChange={(value) => handleSelectCity(value)}
            placeholder={{ label: 'Selecione uma Cidade', value: 0}}
            value={selectedCity}
            style={styles.select}
            items={
              citys.map(city => (
                { label: city, value: city, key: city }
              ))
            }
          />
          <RectButton 
            style={styles.button} 
            onPress={handleNavigateToMap}
            enabled={(selectedCity !== '0') && (selectedUfs !== '0') ? true: false}
          >
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>      
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});