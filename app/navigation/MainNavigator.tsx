import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, Text } from 'react-native';
import AboutScreen from '../screens/Payment';
import HomeScreen from '../screens/Home';
import HomeIcon from '../assets/icons/homeIcon';
import WalletIcon from '../assets/icons/walletIcon';
import { phoneHeight } from '../utils/dimensions';
import PaymentScreen from '../screens/Payment';



const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { height: Platform.OS === 'ios' ? 100 : 70, paddingTop: phoneHeight * 0.03 / 2 },
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused }) => (
          <HomeIcon fill={focused ? "#18181B" : '#c9c9c9'} />
        )
      }} />

      <Tab.Screen name="About" component={PaymentScreen} options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused }) => (
          <WalletIcon fill={focused ? "#18181B" : '#c9c9c9'} />
        )
      }} />

    </Tab.Navigator>
  );
}

export default MainScreen;