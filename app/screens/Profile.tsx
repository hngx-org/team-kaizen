import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../components/shared/AppButton';

function ProfileScreen({ navigation }): JSX.Element {
  const [details, setDetails] = useState();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('details');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getMain = () => {
    getData()
      .then(data => data)
      .then(value => {
        setDetails(value);
      });
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMain();
  }, []);
  return (
    <DashboardLayout>
      <AppText>Name </AppText>
      <AppText style={{
        backgroundColor: '#bab9b7',
        color: '#fff',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
      }}> {details?.name.toUpperCase()}</AppText>
      <AppText>Email </AppText>

      <AppText style={{
        backgroundColor: '#bab9b7',
        color: '#fff',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
      }}> {details?.email.toUpperCase()} </AppText>
      <AppText>User ID </AppText>

      <AppText style={{
        backgroundColor: '#bab9b7',
        color: '#fff',
        padding: 20,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 20,
      }}>{details?.id} </AppText>
      <AppText>Credits Left </AppText>

      <AppText style={{
        backgroundColor: '#bab9b7',
        color: '#fff',
        padding: 20,
        marginBottom: 50,
        marginTop: 10,
        borderRadius: 20,
      }}>{details?.credits} </AppText>

      <AppButton
        title="Logout"
        style={{
          backgroundColor: 'red',
          borderRadius: 20,
        }}
        onPress={() => {
          clearData();
        }}
      />
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({});

export default ProfileScreen;
