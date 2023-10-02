import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {phoneFontScale, phoneHeight} from '../utils/dimensions';
import AppText from '../components/AppText';

const AuthLayouts = ({children, title, desc}) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{paddingHorizontal: 34, paddingVertical: 50}}>
        <AppText style={{...styles.text, color: '#ffffff8b'}}>{title}</AppText>
        <AppText style={styles.text}>{desc} </AppText>
      </View>
      <View style={styles.inner}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
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
