import React from 'react';
import {Text} from 'react-native';

export default function AppText({children, style, onPress}): JSX.Element {
  return (
    <Text
      style={{fontFamily: 'Comfortaa-Medium', color: 'black', ...style}}
      onPress={onPress}>
      {children}
    </Text>
  );
}
