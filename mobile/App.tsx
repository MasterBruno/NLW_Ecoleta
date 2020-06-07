import { Roboto_400Regular, Roboto_500Medium, useFonts } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { AppLoading } from 'expo';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Ubuntu_700Bold
  });

  if (!fontsLoaded) return(<AppLoading />);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Routes />
    </SafeAreaView>
  );
}