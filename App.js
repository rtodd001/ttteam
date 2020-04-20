import React , {useState, Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      error : null,
      isLoaded: false,
      mess: "Press to connect",
      click: false,
      items: []
    }
    this.onPress = this.onPress.bind(this)
  }

  componentDidMount(){
    this.setState({
      ... this.state,
      isLoaded: true
    })
  }

  componentDidUpdate(prevProps, prevState){
    //const { isLoaded, click} = this.state
    //For mobile, you have to put your own IP instead of using local host
    //you can find the correct IP in the bottom lef of the metro bundler by
    //the QR code. Replace <IP> below with yours
    //fetch("http://<IP>:5000/")
    if(prevState.click !== this.state.click){
      console.log("Fetching")
      fetch("http://192.168.1.8:5000/",{
        key: 'ID'
      })
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.item,
            mess: result.item[0].data
          });
        },
        (error) => {
          this.setState({
            error
          })        
      }) 
    }
  }

  onPress = () => {
    this.setState({
      ...this.state,
      click: true
      //mess: this.state.items[0].data
    })
    console.log("In press")
  }

  render(){
  
    console.log(this.state)
    const { error, isLoaded, click } = this.state;
    //help

    if (error) {
      return <View><Text>{error.message}</Text></View>
    } 
    else if (!isLoaded) {
      return <View><Text>Loading...</Text></View>
    } 
    else if (!click) {
      return (
        <View style={styles.container}>
          <Button title ="Press Me!" onPress={() => this.onPress()}/>
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <Text>{this.state.mess}</Text>
        </View>
        
      )
    }
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