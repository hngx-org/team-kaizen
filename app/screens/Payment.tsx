import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import DashboardLayout from '../layouts/DashboardLayout';
import AppButton from '../components/shared/AppButton';

function PaymentScreen(): JSX.Element {
  return (
    <DashboardLayout>
      <AppText>Subscribe for more credits</AppText>
      <AppButton
        title="Subscribe"
        style={{
          marginTop: 10,
        }}
      />
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({});

export default PaymentScreen;
