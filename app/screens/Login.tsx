import React, { useState } from 'react';
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
import { ApiService } from '../services/services';
import axios from 'axios';

function LoginScreen({ navigation }): JSX.Element {

  const storeDetails = async (itemKey: any, itemVal: any) => {
    try {
      const jsonValue = JSON.stringify(itemVal);
      await AsyncStorage.setItem(`${itemKey}`, jsonValue);
      navigation.navigate('Home')

    } catch (e) {
      // saving error
    }

  };
  const [details, setDetails] = useState({
    email: "test@mail.com",
    password: "password",
  })
  const [loading, setLoading] = useState(false)

  const loginUser = async () => {
    console.log('loading')
    setLoading(true)
    try {
      const data = await ApiService.loginUser(details)
      console.log(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)

    }
  }

  return (
    <AuthLayouts title='Log in' desc="Your Very Own Virtual Assistant">
      <AppInput label='Email Address' placeholder='Type in Email Address' />
      <AppInput label='Password' placeholder='Type in Password' secureTextEntry={true} />
      <AppButton disabled={loading} title='Login' onPress={() => {
        loginUser()
      }} />
      <View>
        <AppText>Don't have an account? <AppText onPress={() => {
          navigation.navigate('Sign')

        }} style={{ color: '#10B981' }}>Signup</AppText> </AppText>
      </View>
    </AuthLayouts>
  );
}

export default LoginScreen;
