import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen'
import SearchScreen from './src/screens/SearchScreen';

//this is a stack navigator to show on the screen
const navigator = createStackNavigator(
  //this gives the stack navigator the possible list of screen to show to the user 'name': 'name of file'
  {
    Home: HomeScreen,
    Search: SearchScreen
  },
  
  //initialRouteName = is the 1st component to show on the screen
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "TTTEAM"
    }
  }
);

export default createAppContainer(navigator);
