import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import AppButton from '../components/shared/AppButton';
import AppInput from '../components/shared/AppInput';
import AuthLayouts from '../layouts/AuthLayout';

function LoginScreen({navigation}): JSX.Element {
    

  return (
    <AuthLayouts title='Log in' desc="Your Very Own Virtual Assistant">
        <AppInput label='Email Address' placeholder='Type in Email Address' />
        <AppInput label='Password' placeholder='Type in Password' />
        <AppButton title='Login' onPress={() => {
navigation.navigate('Main')
        }} />
    </AuthLayouts>
  );
}

export default LoginScreen;
