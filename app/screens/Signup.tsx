<<<<<<< HEAD
import React, {useState} from 'react';
import {View, Text} from 'react-native';
=======
import React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
>>>>>>> 5f9c063 (feat:AI Implementation)
import AuthLayouts from '../layouts/AuthLayout';
import AppText from '../components/AppText';
import AppInput from '../components/shared/AppInput';
import AppButton from '../components/shared/AppButton';
import {ApiService} from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUpScreen({navigation}) {
<<<<<<< HEAD
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
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  const registerUser = async () => {
    if (
      details?.name &&
      details?.email &&
      details?.password &&
      details?.confirm_password
    ) {
      if (details?.password === details?.confirm_password) {
        setError();
        setLoading(true);
        console.log('loading');
        setResponse();
        try {
          const data = await ApiService.registerUser(details);
          console.log(data);
          setLoading(false);
          storeDetails('details', data?.data);
          setResponse(data);
        } catch (err) {
          console.log(err);
          setLoading(false);
          setError(err);
        }
      } else {
        setError("Passwords don't match");
      }
    } else {
      setError('Please fill all fields');
    }
  };
  return (
    <AuthLayouts title="Sign up" desc="Your Very Own Virtual Assistant">
      <AppInput
        setText={val => {
          setDetails({...details, name: val});
        }}
        label="Name"
        placeholder="Type in Name"
      />
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
      <AppInput
        setText={val => {
          setDetails({...details, confirm_password: val});
        }}
        label="Confirm Password"
        placeholder="Type in Password"
        secureTextEntry={true}
      />
      <AppText style={{color: 'red'}}>
        {error && 'Error Creating User, please try again'}
      </AppText>
      <AppText style={{color: 'green'}}>
        {JSON.stringify(response && 'Account Created')}
      </AppText>

      <AppButton
        disabled={loading}
        title="Sign Up"
        onPress={() => {
          registerUser();
        }}
      />

      <View>
        <AppText>
          Already have an account?{' '}
          <AppText
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{color: '#10B981'}}>
            Login
          </AppText>{' '}
        </AppText>
      </View>
    </AuthLayouts>
=======
  const [namee, setNamee] = useState('');
  const [emaile, setEmaile] = useState('');
  const [passworde, setPassworde] = useState('');
  const [confirmPassworde, setconfirmPassworde] = useState('');

  const logInData = {
    name: namee,
    email:emaile,
    password: passworde,
    confirm_password: confirmPassworde
  }

  const SignUp = () => {
    fetch('https://spitfire-interractions.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logInData)
    })
    .then(response => {
        console.log("We have gotten response");
        console.log(response.status);
        console.log(response.body);
        return response.json();})
    .then(data => console.log(data)).catch((error) => {
        console.log("Error with callback" + error);
    })
  };

  return (
    <AuthLayouts title='Sign up' desc="Your Very Own Virtual Assistant">
        <AppInput label='Name' placeholder='Type in Name' setText={setNamee}/>
         <AppInput label='Email Address' placeholder='Type in Email Address' setText={setEmaile} />
        <AppInput label='Password' placeholder='Type in Password' secureTextEntry={true} setText={setPassworde}/>
        <AppInput label='Confirm Password' placeholder='Type in Password' secureTextEntry={true} setText={setconfirmPassworde}/>
        <AppButton title='Sign up' onPress={() => {
          SignUp();
          navigation.navigate('Main');
        }} />
   
    <View>
        <AppText>Already have an account? <AppText onPress={() => {
navigation.navigate('Login')
            
        }} style={{color: '#10B981'}}>Login</AppText> </AppText>
    </View>
</AuthLayouts>
>>>>>>> 5f9c063 (feat:AI Implementation)
  );
}
