import React, { useState } from 'react';
import { TextInput } from 'react-native';

const Input = ({defaultText}) => {
  const [value, onChangeText] = useState(defaultText);

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}
export default Input
