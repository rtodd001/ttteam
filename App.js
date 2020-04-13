import React , {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState('You are learning!')
  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button title ="Press Me!" onPress={() => setOutputText('Nice!')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
