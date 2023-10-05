import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/shared/AppInput';
import { ApiService } from '../services/services';
import AppButton from '../components/shared/AppButton';


function HomeScreen({ navigation }): JSX.Element {
  const [details, setDetails] = useState();
  const storeDetails = async (itemKey: any, itemVal: any) => {
    try {
      const jsonValue = JSON.stringify(itemVal);
      await AsyncStorage.setItem(`${itemKey}`, jsonValue);
      navigation.navigate('Main');
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('details');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const [loading, setLoading] = useState();
  const [response, setResponse] = useState();
  const [error, setError] = useState();



  const [inputData, setInputData] = useState('');
  const [history, setHistory] = useState([])


  const newRes = response
  const newInput = inputData


  const chatWithAi = async () => {
    if (inputData) {
      setResponse();
      setLoading(true);
      setError();
      if (history?.includes(newInput)) {
        console.log('match')
      } else {
        setHistory(current => [...current, `user: ${newInput}`])
      }
      try {
        const data = await ApiService.chatWithAI({
          history: history,
          user_input: newInput,
        });
        console.log('ress', data);
        console.log('input', newInput, inputData)
        setResponse(data);
        setLoading(false);
        //setHistory(current => [...current.filter((item => item.split(' ').include('error:'))), `AI: ${data?.message}`])
        setHistory(current => [...current, `AI: ${data?.message}`])
        setInputData()
      } catch (err) {
        if (err) {
          console.log('err', err);
          setLoading(false);
          setHistory(current => [...current, `error: ${[err?.response?.data?.message, err?.response?.data?.error, err?.response?.data?.content]}`])
          setError([err?.response?.data?.message, err?.response?.data?.error, err?.response?.data?.content]);
        }
      }
    } else {
      Alert.alert('Ask a question');
      setError()
    }
  };
  console.log('hist', history)
  console.log(newInput, 'val2')

  return (
    <>
      <View style={{ backgroundColor: 'white', padding: 20, left: 0, width: '100%' }}>
        <AppInput
          setText={(val) => {
            setInputData(val);
            console.log(val, newInput, 'val')
          }}

          placeholder="what would you like me to do for you"
        />
        <AppButton
          title="Ask"
          disabled={loading}
          style={{
            marginTop: 0

          }}
          onPress={() => {
            chatWithAi();
          }}
        />
      </View>
      <DashboardLayout>


        {history?.length === 0 && <AppText
          style={styles.empty}>
          What whould you like to do
        </AppText>}
        {history?.map((item, index) => {
          return (item.split(" ").includes('user:') || item.split(" ").includes('error:') ?
            <View key={index} style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: item.split(" ").includes('error:') ? 'red' : '#8c8c8ce3', borderRadius: 1000, marginRight: 10 }}>
                <AppText style={{ color: '#fff' }}>{item.split(" ").includes('error:') ? '' : 'M E'}</AppText>
              </View>
              <AppText

                style={styles.person(item)}>
                {item.split(" ").includes('error:') ? item.replace('error:', '-') : item.replace('user:', '-')}
              </AppText>
            </View>
            : <View key={index} style={{ flexDirection: 'row', marginLeft: 'auto' }}>
              <AppText
                style={styles.ai(item)}>
                {item.replace('AI:', '-')}
              </AppText>
              <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000e2', borderRadius: 1000, marginLeft: 10 }}>
                <AppText style={{ color: '#fff' }}>A I</AppText>
              </View>

            </View>
          )
        })}

      </DashboardLayout>
    </>
  );
}
const styles = StyleSheet.create({
  person: item => ({
    backgroundColor: item.split(" ").includes('user:') ? '#8c8c8ce3' : 'red',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%'
  }),
  ai: item => ({
    backgroundColor: item.split(" ").includes('user:') ? '#8c8c8ce3' : '#000',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '60%',
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
  error: {
    backgroundColor: 'red',
    color: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  lottie: {
    width: 100,
    height: 100
  }
});

export default HomeScreen;
