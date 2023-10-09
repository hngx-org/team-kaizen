/* eslint-disable prettier/prettier */
// App.js
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';



function App(): JSX.Element {

  return (
    <View style={{flex:1}}>
    <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
    <StatusBar style='auto' />
</View>
  );
}



export default App;
