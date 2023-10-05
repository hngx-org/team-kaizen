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
  //const [history, setHistory] = useState(["user: Good Books about me", "AI: I think there should be a debug mode for the open AI package for now, because I can't count the number of accounts I created just to get a different cookie to work with.... please can you look into this that in this case can be done from the point of contact with the Open Ai Apis which Mr backend is, except they put optional variables which the mobile can use, we can do nada"])
  const [history, setHistory] = useState([])


  const newRes = response
  const newInput = inputData


  const chatWithAi = async () => {
    if (inputData) {
      setResponse();
      setLoading(true);
      setError();
      /*   if (history?.includes(newInput)) {
  
        } */
      setHistory(current => [...current, `user: ${newInput}`])
      try {
        const data = await ApiService.chatWithAI({
          history: history,
          user_input: newInput,
        });
        console.log('ress', data);
        console.log('input', newInput, inputData)
        setResponse(data);
        setLoading(false);
        setHistory(current => [...current, `AI: ${data?.message}`])
      } catch (err) {
        console.log('err', err);
        setLoading(false);
        setError([err?.response?.data?.message, err?.response?.data?.error, err?.response?.data?.content]);
      }
    } else {
      Alert.alert('Ask a question');
      setError()
    }
  };
  console.log('his', history?.includes(inputData), newInput, newRes, '')
  const title = 'Big food bowwn'
  return (
    <DashboardLayout>
      <View style={{ position: 'absolute', top: '0', width: '100%' }}>
        <AppInput
          setText={(val) => {
            setInputData(val);
            console.log(val, newInput)
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
      <View style={{ opacity: 0, pointerEvents: 'none' }}>
        <AppInput
          setText={(val) => {
            setInputData(val);
            console.log(val, newInput)
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
      </View>
      {error && <AppText style={{
        backgroundColor: 'red',
        color: '#fff',
        padding: 20,
        borderRadius: 20,
      }}>{error && error.join(' ')}</AppText>}

      <ScrollView>
        {history?.length === 0 && <AppText
          style={{
            backgroundColor: '#8c8c8ce3',
            color: '#fff',
            padding: 20,
            borderRadius: 20,
            opacity: 0.6,
            marginTop: 40,
            marginBottom: 10,
          }}>
          What whould you like to do
        </AppText>}
        {history?.map((item, index) => {
          return (item.split(" ").includes('user:') ?
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8c8c8ce3', borderRadius: 1000, marginRight: 10 }}>
                <AppText style={{ color: '#fff' }}>M E</AppText>
              </View>
              <AppText
                key={index}
                style={{
                  backgroundColor: item.split(" ").includes('user:') ? '#8c8c8ce3' : '#000',
                  color: '#fff',
                  padding: 20,
                  borderRadius: 20,
                  marginBottom: 10,
                  width: '60%'

                }}>
                {item.replace('user:', '-')}
              </AppText>
            </View>
            : <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
              <AppText
                key={index}
                style={{
                  backgroundColor: item.split(" ").includes('user:') ? '#8c8c8ce3' : '#000',
                  color: '#fff',
                  padding: 20,
                  borderRadius: 20,
                  marginBottom: 10,
                  width: '70%'
                }}>
                {item.replace('AI:', '-')}
              </AppText>
              <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000e2', borderRadius: 1000, marginLeft: 10 }}>
                <AppText style={{ color: '#fff' }}>A I</AppText>
              </View>

            </View>
          )
        })}
      </ScrollView>

    </DashboardLayout>
  );
}
const styles = StyleSheet.create({});

export default HomeScreen;
