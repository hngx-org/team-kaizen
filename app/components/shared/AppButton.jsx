import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {phoneHeight} from '../../utils/dimensions';
import AppText from '../AppText';

export default function AppButton({
  title = 'Click Me',
  onPress,
  bgColor = '#10B981',
  color = '#FFFFFF',
  disabled,
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        backgroundColor: bgColor,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20,
        ...style,
      }}>
      <AppText
        disabled={disabled}
        style={{
          textTransform: 'capitalize',
          textAlign: 'center',
          paddingVertical: (phoneHeight * 0.03) / 2,
          paddingBottom: (phoneHeight * 0.04) / 2,
          fontSize: 18,
          fontWeight: '300',
          borderColor: bgColor,
          color: '#FFFFFF',
          ...style,
        }}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}
