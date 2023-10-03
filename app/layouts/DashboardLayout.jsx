import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  StatusBar,
  ScrollView,
} from 'react-native';
import AppText from '../components/AppText';
import {phoneFontScale, phoneWidth} from '../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardLayout({children, geData}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      if (geData) {
        geData();
      }
    }, 2000);
  }, []);

  const navigation = useNavigation();

  const routes = navigation.getState()?.routeNames;
  const prevRoute = routes[routes.length - 2];
  useEffect(() => {
    onRefresh();
  }, [prevRoute]);

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

  useEffect(() => {
    getMain();
  }, []);

  console.log(details);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.top}>
        <AppText
          style={{marginBottom: 20, fontSize: (phoneFontScale * 40) / 2}}>
          {details?.name}
        </AppText>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.inner}>
        {children}
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  top: {
    paddingHorizontal: (phoneWidth * 0.1) / 2,
    paddingVertical: (phoneWidth * 0.1) / 2,
  },
  inner: {
    paddingHorizontal: (phoneWidth * 0.08) / 2,
    backgroundColor: '#ffffff',
  },
});
