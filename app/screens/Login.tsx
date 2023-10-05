import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import AppButton from '../components/shared/AppButton';
import AppInput from '../components/shared/AppInput';
import AuthLayouts from '../layouts/AuthLayout';
import AppText from '../components/AppText';
import {ApiService} from '../services/services';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}): JSX.Element {
  const storeDetails = async (itemKey: any, itemVal: any) => {
    try {
      const jsonValue = JSON.stringify(itemVal);
      await AsyncStorage.setItem(`${itemKey}`, jsonValue);
      navigation.navigate('Main');
    } catch (e) {
      // saving error
    }
  };
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  const loginUser = async () => {
    if (details?.email && details?.password) {
      setResponse();
      setLoading(true);
      setError();
      try {
        const data = await ApiService.loginUser(details);
        console.log(data);
        setResponse(data);
        storeDetails('details', data?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err);
      }
    } else {
      setError('Please fill all fields');
    }
  };

  useEffect(() => {
    setDetails({
      email: '',
      password: '',
    });
    setError();
    setResponse();
  }, []);
  return (
    <AuthLayouts title="Log in" desc="Your Very Own Virtual Assistant">
      <AppInput
        setText={val => {
          setDetails({...details, email: val});
        }}
        label="Email Address"
        placeholder="Type in Email Address"
      />
      <AppInput
        setText={val => {
          setDetails({...details, password: val});
        }}
        label="Password"
        placeholder="Type in Password"
        secureTextEntry={true}
      />
      <AppText style={{color: 'red'}}>{error && 'Please Try Again'}</AppText>

      <AppButton
        disabled={loading}
        title="Login"
        onPress={() => {
          loginUser();
        }}
      />
      <View>
        <AppText>
          Don't have an account?{' '}
          <AppText
            onPress={() => {
              navigation.navigate('Sign');
            }}
            style={{color: '#10B981'}}>
            Signup
          </AppText>{' '}
        </AppText>
      </View>
    </AuthLayouts>
  );
}

export default LoginScreen;
