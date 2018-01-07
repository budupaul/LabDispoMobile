import { StackNavigator } from 'react-navigation';
import HomeScreen from './Containers/HomeScreen';
import SecondScreen from './Containers/SecondScreen';
import InitScreen from './Containers/InitScreen';
import AddSongScreen from './Containers/AddSongScreen';
//Create the routes of the application
export default RouterComponent = StackNavigator({
	Init: { screen: InitScreen },
    Home: { screen: HomeScreen },
    Second: { screen: SecondScreen },
	AddSong: { screen: AddSongScreen }
});

  