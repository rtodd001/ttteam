import React from 'react';
import { View, TextInput, StyleSheet, Picker } from 'react-native';

const PickerList = ({title, activeLabel, listLabels, onChange}) => {
  console.log('5, listLabels pickerList', listLabels)
  return (
      <Picker style={styles.pickerStyle}
        selectedValue={activeLabel}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
      <Picker.Item label={"Select a " + title} value=''/>
      {listLabels.map((item,idx) => <Picker.Item label={item} value={item} key={idx} />)}
      </Picker>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    flex: 1,
    backgroundColor: '#deddd9'
}
});

export default PickerList;