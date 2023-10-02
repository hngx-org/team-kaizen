import React from 'react';
import {
  SafeAreaView,
  ScrollView,StyleSheet,
  Text,
  View,
} from 'react-native';
import AppText from '../components/AppText';

function HomeScreen(): JSX.Element {

  return (
    <SafeAreaView style={styles.main}>
        <AppText> Home </AppText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'space-between',
  },
 
});
export default HomeScreen;
