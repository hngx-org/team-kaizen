import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../components/shared/AppButton';

function ProfileScreen({navigation}): JSX.Element {
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
      <AppText>Name: {details?.name} </AppText>
      <AppText>Email: {details?.email} </AppText>
      <AppText>User Id: {details?.id} </AppText>
      <AppText>Credits: {details?.credits} </AppText>

      <AppButton
        title="Logout"
        style={{
          backgroundColor: 'red',
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
