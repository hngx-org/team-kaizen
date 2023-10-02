import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {phoneFontScale, phoneHeight} from '../utils/dimensions';

const AuthLayouts = ({children, title, desc}) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{paddingHorizontal: 34, paddingVertical: 50}}>
        <Text style={{...styles.text, color: '#ffffff8b'}}>{title}</Text>
        <Text style={styles.text}>{desc} </Text>
      </View>
      <View style={styles.inner}>{children}</View>
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
