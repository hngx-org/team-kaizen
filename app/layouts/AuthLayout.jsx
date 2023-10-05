import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';
import {phoneFontScale, phoneHeight} from '../utils/dimensions';
import AppText from '../components/AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AuthLayouts = ({children, title, desc}) => {
  const navigation = useNavigation();

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
        if (value) {
          navigation.navigate('Main');
        }
      });
  };

  useEffect(() => {
    getMain();
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <View style={{paddingHorizontal: 34, paddingVertical: 50}}>
        <AppText style={{...styles.text, color: '#ffffff8b'}}>{title}</AppText>
        <AppText style={styles.text}>{desc} </AppText>
      </View>
      <View style={styles.inner}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'space-between',
  },
  inner: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: (phoneFontScale * 56) / 2,
    marginBottom: 20,
  },
});

export default AuthLayouts;
