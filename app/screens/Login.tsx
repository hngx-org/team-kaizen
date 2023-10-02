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
import AppText from '../components/AppText';

function LoginScreen({navigation}): JSX.Element {
    

  return (
    <AuthLayouts title='Log in' desc="Your Very Own Virtual Assistant">
        <AppInput label='Email Address' placeholder='Type in Email Address' />
        <AppInput label='Password' placeholder='Type in Password' secureTextEntry={true} />
        <AppButton title='Login' onPress={() => {
navigation.navigate('Main')
        }} />
        <View>
            <AppText>Don't have an account? <AppText onPress={() => {
navigation.navigate('Sign')
                
            }} style={{color: '#10B981'}}>Signup</AppText> </AppText>
        </View>
    </AuthLayouts>
  );
}

export default LoginScreen;
