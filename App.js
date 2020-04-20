import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen'
import ResultsScreen from './src/screens/ResultsScreen';

//this is a stack navigator to show on the screen
const navigator = createStackNavigator(
  //this gives the stack navigator the possible list of screen to show to the user 'name': 'name of file'
  {
    Home: HomeScreen,
    Results: ResultsScreen
  },
  
  //initialRouteName = is the 1st component to show on the screen
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "TTTEAM"
    }
  },
  {
    navigationOptions: "Results",
    defaultNavigationOptions: {
      title: "Result"
    }
  }
);


export default createAppContainer(navigator);
