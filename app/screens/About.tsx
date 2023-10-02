import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import AppText from '../components/AppText';

function AboutScreen(): JSX.Element {

  return (
    <SafeAreaView>
        <AppText> about </AppText>
    </SafeAreaView>
  );
}

export default AboutScreen;
