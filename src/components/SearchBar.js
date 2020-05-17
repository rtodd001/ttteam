import React from 'react';
import { View, TextInput, StyleSheet, Picker } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit, title }) => {
  return (
    <View style={styles.backgroundStyle}>
      {/* <Feather name="search" style={styles.iconStyle} /> */}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder={title}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
        clearButtonMode = "always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#deddd9',
    height: 30,
    marginHorizontal: 15,
    // marginBottom: 5
    // borderRadius: 5,
    // padding: 5,

  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15
  }
});

export default SearchBar;