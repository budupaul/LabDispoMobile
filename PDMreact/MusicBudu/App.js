import React from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet } from 'react-native';
import {email} from 'react-native-communications'
import { StackNavigator } from 'react-navigation';

export class App extends React.Component {
	/*state = {
      myState: 'Lorem ipsum do'
   }
   updateState = () => {
      this.setState({ myState: 'The state is updated' })
   }*/
   constructor(props){
	   super(props);
   }
  render() {

	
	var viewText = [];
	//console.log(this.props.navigation.state.params);
	var music = this.props.navigation.state.params.music;
	const { navigate } = this.props.navigation;
		for(let i = 0; i < music.length; i++){

			viewText.push(
				<View key = {i}>
					<Button
				onPress={() => this.props.navigation.navigate('Song', {music: music, index: i})}
				title={music[i].title + ' By: ' + music[i].artist}
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
				</View>
			)
			console.log(music[i]);
		}
	return (
			<View>
			{ viewText }
			</View>
		)
  }
  
  setMail(text){
	  
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
export class SongModel{
	artist = 'Lal';
	title = 'Bal';
	constructor(title, artist){
		this.artist = artist;
		this.title = title;
	}
	
	setTitle(title){
		this.title = title;
		console.log(title);
	}
	setArtist(artist){
		this.artist = artist;
	}
}
export class SongList{
	list = [];
	constructor(){
		
	}
	push( song ){
		this.list.push(song);
	}
}
export class Song extends React.Component{
	state = {artist: 'Lala', title:'Band'}
	//static navigationOptions = ({ navigation }) => ({
    //title: `Chat with ${navigation.state.params.title}`,
  //});
	constructor(props){
		super(props);
		const {navigation} = this.props.navigation;
		/*if (typeof tit === 'string' || tit instanceof String){
			this.state = {
			artist: art.toString(),
			title: tit.toString()}
		}*/
		/*else{
			this.state = {
			artist: art.toString(),
			title: tit.toString()}
		}*/
		/*
		this.state = {
			artist: art.toString(),
			title: tit.toString()}
		if (typeof tit !== 'string'){
			this.state = {
			artist: 'Mad',
			title: 'Mad'}
		}*/
	}
	render(){
		//const { params } = this.props.navigation.state;
		//{"navigation":{"state":{"params":{"title":
		//	81370-2","routeName":"Song"}}}
		var music = this.props.navigation.state.params.music;
		var index = this.props.navigation.state.params.index;
		console.log(this.props.navigation.state.params);
		return (
			<View>
			<Text>{music[index].title}</Text>
			<Text>{music[index].artist}</Text>
			<Text></Text>
			<Text>Edit title:</Text>
			<TextInput onChangeText={(text) => music[index].setTitle({text}.text)} style={styles.input} editable={true}/>

			<Text></Text>
			<Text>Edit artist:</Text>
			<TextInput onChangeText={(text) => music[index].setArtist({text}.text)} style={styles.input} editable={true}/>
			
			<Button
              onPress={() => this.props.navigation.navigate('App', {music: music})}
              title="Go home"
            />
			</View>
		  )
	}

}
export class Music extends React.Component {
	music = new SongList();
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        }
		var song1 = new SongModel('Maria','Magdalena'); 
		var song2 = new SongModel('A','Bjj');
		var song3 = new SongModel('C','D');
		var song4 = new SongModel('Peste','flambat');
		this.music.push(song1);
		this.music.push(song2);
		this.music.push(song3);
		this.music.push(song4);
    }
 
     loginButtonPressed(){
        Alert.alert("sending email..");
        email(['aslasldasdasd@asdasd.com'], null, null, "react-native mail test", "logged in at: " + new Date().toDateString());
     }
    setMail(text){
         this.state.mail = text;
    }
    setPassword(text){
        this.state.password= text;
    }
 
    render() {
		//console.log(this.music);
		const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Email:</Text>
                <TextInput onChangeText={(text) => this.setMail({text})} style={styles.input} />
 
                <Text>Password:</Text>
                <TextInput secureTextEntry={true} onChangeText={(text) => this.setPassword({text})} style={styles.input} />
                <Button onPress={() => this.loginButtonPressed()}
                        title="log in">
                    <Text style={styles.button}>Submit</Text>
                </Button>
				<Text></Text>
				<Button onPress={() => navigate('App', {music: this.music.list})}
                        title="Go to app">
                    <Text style={styles.button}>Submit</Text>
                </Button>
 
            </View>
        );
    }
}
const RootNavigator = StackNavigator({
  Music: {
    screen: Music,
  },
  Song: {
	  screen: Song,
  },
  App: {
	  screen: App,
  }

});

export default RootNavigator;