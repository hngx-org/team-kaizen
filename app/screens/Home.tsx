import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/shared/AppInput';
import {ApiService} from '../services/services';
import AppButton from '../components/shared/AppButton';

function HomeScreen({navigation}): JSX.Element {
  const [loading, setLoading] = useState();
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const [inputData, setInputData] = useState('');
  const [history, setHistory] = useState([]);

  const newRes = response;
  const newInput = inputData;

  const chatWithAi = async () => {
    if (inputData) {
      setResponse();
      setLoading(true);
      setError();
      if (history?.includes(newInput)) {
        return;
      } else {
        setHistory(current => [...current, `user: ${newInput}`]);
      }
      try {
        const data = await ApiService.chatWithAI({
          history: history,
          user_input: newInput,
        });
        setResponse(data);
        setLoading(false);
        //setHistory(current => [...current.filter((item => item.split(' ').include('error:'))), `AI: ${data?.message}`])
        setHistory(current => [...current, `AI: ${data?.message}`]);
        setInputData('');
      } catch (err) {
        console.log('newerror', err?.response);
        setLoading(false);
        if (err.message === 'Network Error') {
          setError([
            err?.message,
            err?.response?.data?.message,
            err?.response?.data?.error,
            err?.response?.data?.content,
          ]);
        } else {
          setError([
            err?.response?.data?.message,
            err?.response?.data?.error,
            err?.response?.data?.content,
          ]);
        }
      }
    } else {
      Alert.alert('Ask a question');
      setError();
    }
  };

  return (
    <>
      <View
        style={{backgroundColor: 'white', padding: 20, left: 0, width: '100%'}}>
        <AppInput
          setText={val => {
            setInputData(val);
          }}
          placeholder="what would you like me to do for you"
        />
        <AppButton
          title="Ask"
          disabled={loading}
          style={{
            marginTop: 0,
          }}
          onPress={() => {
            chatWithAi();
          }}
        />
      </View>
      <DashboardLayout>
        {history?.length === 0 && (
          <AppText style={styles.empty}>What whould you like to do</AppText>
        )}
        {history?.map((item, index) => {
          return item.split(' ').includes('user:') ||
            item.split(' ').includes('error:') ? (
            <View key={index} style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: item.split(' ').includes('error:')
                    ? 'red'
                    : '#8c8c8ce3',
                  borderRadius: 1000,
                  marginRight: 10,
                }}>
                <AppText style={{color: '#fff'}}>
                  {item.split(' ').includes('error:') ? '' : 'M E'}
                </AppText>
              </View>
              <AppText style={styles.person(item)}>
                {item.split(' ').includes('error:')
                  ? item.replace('error:', '-')
                  : item.replace('user:', '-')}
              </AppText>
            </View>
          ) : (
            <View
              key={index}
              style={{flexDirection: 'row', marginLeft: 'auto'}}>
              <AppText style={styles.ai(item)}>
                {item.replace('AI:', '-')}
              </AppText>
              <View
                style={{
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000000e2',
                  borderRadius: 1000,
                  marginLeft: 10,
                }}>
                <AppText style={{color: '#fff'}}>A I</AppText>
              </View>
            </View>
          );
        })}
        {error && (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ff0000df',
                borderRadius: 1000,
                marginRight: 10,
              }}>
              <AppText style={{color: '#fff'}}></AppText>
            </View>
            <AppText style={styles.error}>{error}</AppText>
          </View>
        )}
        {loading && (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#525252e0',
                borderRadius: 1000,
                marginRight: 10,
              }}>
              <AppText style={{color: '#fff'}}></AppText>
            </View>
            <AppText style={styles.loading}>Typing...</AppText>
          </View>
        )}
      </DashboardLayout>
    </>
  );
}
const styles = StyleSheet.create({
  person: item => ({
    backgroundColor: item.split(' ').includes('user:') ? '#8c8c8ce3' : 'red',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%',
  }),
  loading: {
    backgroundColor: '#525252e0',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%',
  },
  error: {
    backgroundColor: '#ff0000df',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%',
  },
  ai: item => ({
    backgroundColor: item.split(' ').includes('user:') ? '#8c8c8ce3' : '#000',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '70%',
  }),
  empty: {
    backgroundColor: '#8c8c8ce3',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    opacity: 0.6,
    marginTop: 40,
    marginBottom: 10,
  },

  lottie: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
