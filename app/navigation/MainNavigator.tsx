import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Text} from 'react-native';
import AboutScreen from '../screens/About';
import HomeScreen from '../screens/Home';
import HomeIcon from '../assets/icons/homeIcon';
import WalletIcon from '../assets/icons/walletIcon';



const Tab = createBottomTabNavigator();

function MainScreen() {

  return (
      <Tab.Navigator screenOptions={{
        tabBarStyle: {height:70,paddingTop:10 },
      }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{  headerShown: false, tabBarLabel: '',
        tabBarIcon: ({ color, size, focused }) => (
         <HomeIcon fill={focused?"#18181B": '#c9c9c9'} />
      ) }} />

<Tab.Screen name="About" component={AboutScreen} options={{  headerShown: false, tabBarLabel: '',
         tabBarIcon: ({ color, size, focused }) => (
        <WalletIcon fill={focused?"#18181B": '#c9c9c9'} />
     ) }} />
      
      </Tab.Navigator>
  );
}

export default MainScreen;