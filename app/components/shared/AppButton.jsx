import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {phoneHeight} from '../../utils/dimensions';

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
      <Text
        disabled={disabled}
        style={{
          textTransform: 'capitalize',
          textAlign: 'center',
          paddingVertical: (phoneHeight * 0.03) / 2,
          fontSize: 18,
          fontWeight: '300',
          borderColor: bgColor,
          fontFamily: 'Satoshi-Black',
          color: '#FFFFFF',
          fontWeight: 800,
          ...style,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
