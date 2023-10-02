import React from 'react';
import {Path, Svg, Rect} from 'react-native-svg';

export default function WalletIcon({fill = '#18181B'}) {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect y="2" width="32" height="27" rx="8" fill={fill} />
      <Rect x="22" y="20" width="6" height="5" rx="2" fill="white" />
    </Svg>
  );
}
