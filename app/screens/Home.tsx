import React from 'react';
import {
  SafeAreaView,
  ScrollView,StyleSheet,
  Text,
  View,
} from 'react-native';

function HomeScreen(): JSX.Element {

  return (
    <SafeAreaView style={styles.main}>
        <Text> Home </Text>
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
