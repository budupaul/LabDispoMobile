import React from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet } from 'react-native';
import {email} from 'react-native-communications'
import { StackNavigator } from 'react-navigation';

export class App extends React.Component {
  render() {

	var song1 = new Song('Maria','Magdalena'); 
	var song2 = new Song('A','B');
	var song3 = new Song('C','D');
	var song4 = new Song('Peste','flambat');	
	var music = [];
	music.push(song1);
	music.push(song2);
	music.push(song3);
	music.push(song4);
	var text = song1.render();
	var payments = [];
	const { navigate } = this.props.navigation;
		for(let i = 0; i < music.length; i++){

			payments.push(
				<View key = {i}>
					<Button
				onPress={() => navigate('Song', {title: 'Mi', artist: 'Mi'})}
				title={music[i].state.title + '  By:' + music[i].state.artist}
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
				</View>
			)
		}
	return (
			<View>
			{ payments }
			</View>
		)
  }
  
  fuckMe(){
	  this.navigate('Song');
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

export class Song extends React.Component{
	state = {artist: 'Lala', title:'Band'}
	//static navigationOptions = ({ navigation }) => ({
    //title: `Chat with ${navigation.state.params.title}`,
  //});
	constructor(tit, art){
		super();
		
		
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
		this.state = {
			artist: art.toString(),
			title: tit.toString()}
		if (typeof tit !== 'string'){
			this.state = {
			artist: 'Mad',
			title: 'Mad'}
		}
	}
	render(){
		//const { params } = this.props.navigation.state;
		return (
			<View>
			<Text>{this.state.title}</Text>
			<Text>{this.state.artist}</Text>
			<Button
              onPress={() => this.props.navigation.navigate('App')}
              title="Go home"
            />
			</View>
		  )
	}
	
	text(){
		
		return (
			<View>
			<Text>{this.title}</Text>
			<Text>{this.artist}</Text>
		  </View>
		  )
	}
	
	edit(){
		return (
			<View style={styles.container}>
			<Text>{this.title}</Text>
			<Text>{this.artist}</Text>
			
		  </View>
		  )
	}
}
export class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        }
    }
 
     loginButtonPressed(){
        Alert.alert("sending email..");
        email(['aslasldasdasd@asdasd.com'], null, null, "react-native mail test", "loged in at: " + new Date().toDateString());
     }
    setMail(text){
         this.state.mail = text;
    }
    setPassword(text){
        this.state.password= text;
    }
 
    render() {
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
				<Button onPress={() => navigate('App')}
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