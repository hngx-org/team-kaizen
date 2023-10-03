import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/shared/AppInput';
import {ApiService} from '../services/services';
import AppButton from '../components/shared/AppButton';

function HomeScreen(): JSX.Element {
  const [details, setDetails] = useState();

  const [loading, setLoading] = useState();
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const [inputData, setInputData] = useState({
    user_input: '',
  });
  const chatWithAi = async () => {
    if (inputData?.user_input) {
      setResponse();
      setLoading(true);
      setError();
      try {
        const data = await ApiService.chatWithAI({
          history: [],
          user_input: inputData?.user_input,
        });
        console.log(data);
        setResponse(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err);
      }
    } else {
      setError('Ask a prompt');
    }
  };

  return (
    <DashboardLayout>
      <AppInput
        setText={val => {
          setInputData({user_input: val});
        }}
        placeholder="what would you like me to do for you"
      />
      <AppButton
        title="Ask"
        disabled={loading}
        onPress={() => {
          chatWithAi();
        }}
      />
      <AppText>{JSON.stringify(error)}</AppText>
      <AppText
        style={{
          backgroundColor: '#10b98180',
          color: '#fff',
          padding: 20,
          borderRadius: 20,
        }}>
        {response?.message}
      </AppText>
    </DashboardLayout>
  );
}
const styles = StyleSheet.create({});

export default HomeScreen;
