import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';

function PaymentScreen(): JSX.Element {
  return (
    <DashboardLayout>
      <AppText>Payment Page</AppText>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({});

export default PaymentScreen;
