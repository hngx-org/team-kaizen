import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { phoneFontScale, phoneHeight, phoneWidth } from '../../utils/dimensions';


export default function AppSelect({ label = 'label', placeholder = 'Select', options, setOptions, value, setValue, onChange }) {
  const [open, setOpen] = useState(false);

  console.log(value)
  /*   const onOpen = useCallback(() => {
      s(false);
    }, []); */
  return (
    <View
      style={{
        width: '100%',
      }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownGender}>
        <DropDownPicker
          style={styles.dropdown}
          open={open}
          value={value} //genderValue
          items={options}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setOptions}
          placeholder={placeholder}
          placeholderStyle={styles.placeholderStyles}
          //onOpen={onOpen}
          onChangeValue={onChange}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  label: {
    color: '#75818F',
    fontSize: 20,
    marginBottom: 10,
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdownGender: {
    marginBottom: 15,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#333333",
    height: 50,
  },
});
