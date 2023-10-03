import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';

function ProfileScreen(): JSX.Element {

  return (
    <DashboardLayout>
      <AppText>My Profile </AppText>
    </DashboardLayout>

  );
}

const styles = StyleSheet.create({});

export default ProfileScreen;
