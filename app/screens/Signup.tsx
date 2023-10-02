import React from 'react';
import { View, Text } from 'react-native';
import AuthLayouts from '../layouts/AuthLayout';
import AppText from '../components/AppText';

export default function SignUpScreen({navigation}) {
  return (
    <AuthLayouts title='Sign up' desc="Your Very Own Virtual Assistant">
   
    <View>
        <AppText>Already have an account? <AppText onPress={() => {
navigation.navigate('Login')
            
        }} style={{color: '#10B981'}}>Login</AppText> </AppText>
    </View>
</AuthLayouts>
  );
}
