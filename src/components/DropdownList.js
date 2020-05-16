import React from 'react'
import {useState} from 'react'
import { Picker, Component, StyleSheet, View } from 'react-native';


const DropdownList = () =>{
    const [selectedValue, setSelectedValue] = useState("java");
    
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      alignItems: "center"
    }
});
export default DropdownList;