import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import AppText from '../components/AppText';
import {phoneFontScale, phoneWidth} from '../utils/dimensions';

export default function DashboardLayout({children}) {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.top}>
        <AppText
          style={{marginBottom: 10, fontSize: (phoneFontScale * 40) / 2}}>
          Adekoya Daniel
        </AppText>
      </View>
      <ScrollView style={styles.inner}>{children}</ScrollView>
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
    paddingHorizontal: (phoneWidth * 0.05) / 2,
  },
  inner: {
    paddingHorizontal: (phoneWidth * 0.04) / 2,
    backgroundColor: '#ffffff',
  },
});
