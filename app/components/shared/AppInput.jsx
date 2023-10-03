import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {phoneFontScale, phoneHeight, phoneWidth} from '../../utils/dimensions';
import {StyleSheet} from 'react-native';
import AppText from '../AppText';

export default function AppInput({
  setText,
  placeholder = 'placeholder',
  style,
  label,
  multiline = false,
  maxLength,
  numberOfLines,
  secureTextEntry,
}) {
  const [color, setColor] = useState('#333333');
  return (
    <View
      style={{
        width: '100%',
      }}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View
        style={{
          marginBottom: (phoneHeight * 0.07) / 2,
          width: '100%',
          ...style,
        }}>
        <TextInput
          onFocus={() => {
            setColor('#FF9405');
          }}
          onBlur={() => {
            setColor('#333');
          }}
          selectTextOnFocus={true}
          style={styles.mainInput(color)}
          placeholder={placeholder}
          placeholderTextColor="#00000082"
          onChangeText={setText}
          numberOfLines={numberOfLines}
          multiline={multiline}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Comfortaa-Bold',
  },
  mainInput: color => ({
    paddingVertical: (phoneHeight * 0.034) / 2,
    paddingHorizontal: (phoneWidth * 0.1) / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: (phoneFontScale * 36) / 2,
    borderRadius: 10,
    color: '#333333',
  }),
});
