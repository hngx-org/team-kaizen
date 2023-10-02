/* eslint-disable prettier/prettier */
// App.js
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigation';



function App(): JSX.Element {

  return (
    <View style={{flex:1}}>
    <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
</View>
  );
}



export default App;
