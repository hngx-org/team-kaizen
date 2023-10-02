import React from 'react';
import { View, Text } from 'react-native';
import AuthLayouts from '../layouts/AuthLayout';
import AppText from '../components/AppText';
import AppInput from '../components/shared/AppInput';
import AppButton from '../components/shared/AppButton';

export default function SignUpScreen({navigation}) {
  return (
    <AuthLayouts title='Sign up' desc="Your Very Own Virtual Assistant">
         <AppInput label='Email Address' placeholder='Type in Email Address' />
        <AppInput label='Password' placeholder='Type in Password' secureTextEntry={true} />
        <AppInput label='Confirm Password' placeholder='Type in Password' secureTextEntry={true} />
        <AppButton title='Sign up' onPress={() => {
navigation.navigate('Main')
        }} />
   
    <View>
        <AppText>Already have an account? <AppText onPress={() => {
navigation.navigate('Login')
            
        }} style={{color: '#10B981'}}>Login</AppText> </AppText>
    </View>
</AuthLayouts>
  );
}
