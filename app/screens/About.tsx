import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';

function AboutScreen(): JSX.Element {

  return (
    <DashboardLayout>
      <AppText> About Page for about people </AppText>
    </DashboardLayout>

  );
}

const styles = StyleSheet.create({});

export default AboutScreen;
