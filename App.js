import React , {useState, Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      error : null,
      isLoaded: false,
      mess: "Press to connect",
      items: []
    }
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData(){
    //For mobile, you have to put your own IP instead of using local host
    //you can find the correct IP in the bottom lef of the metro bundler by
    //the QR code. Replace <IP> below with yours
    //fetch("http://<IP>:5000/")
    fetch("http://localhost:5000/")
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }

  onPress = () => {
    this.setState({
      mess : this.state.items[0].data
    })
  }

  render(){
  
    console.log(this.state)
    const { error, isLoaded, items } = this.state;
    //help

    if (error) {
      return <View><Text>{error.message}</Text></View>
    } else if (!isLoaded) {
      return <View><Text>Loading...</Text></View>
    } return (
      <View style={styles.container}>
        <Text>{this.state.mess}</Text>
        <Button title ="Press Me!" onPress={() => this.onPress()}/>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;