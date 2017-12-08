import React,{Component} from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet, Picker} from 'react-native';
import {addAction} from '../Services/Actions/BasicActions';
import { SongModel } from './InitScreen';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { connect } from 'react-redux';

class AddSongScreen extends Component{

	genre = 'Genre';
	constructor(props){
		super(props);
		const {navigation} = this.props.navigation;
		


	}
	/*
		When we want to add a song we send an addAction and then  navigate back to the home page
	*/
	addSong(song){
		console.log('XXXXX');
		console.log(song);
		this.props.addAction(song);
		this.props.navigation.navigate('Home');
	}
	putGenre(genre){

	}
	render(){

		var song = new SongModel('a','a');
		console.log(this.props.navigation.state.params);
		return (
			<View>

			<Text>Title of the song:</Text>
			<TextInput onChangeText={(text) => song.title = {text}.text} style={styles.input} editable={true}/>

			<Text></Text>
			<Text>Edit artist:</Text>
			<TextInput onChangeText={(text) => song.artist = {text}.text} style={styles.input} editable={true}/>
			<Picker
				selectedValue={this.genre}
				onValueChange={(itemValue, itemIndex) => this.genre = itemValue}>
				<Picker.Item label="Heavy Metal" value="Heavy Metal" />
				<Picker.Item label="Pop" value="Pop" />
				<Picker.Item label="Jazz" value="Jazz" />
				<Picker.Item label="Electro" value="Electro" />
			</Picker>
			<Button
              onPress={() => {this.addSong(song)}}
              title="Save"
            />
			<Button
				title="Show Dialog"
				onPress={() => {
					this.popupDialog.show();
				}}
			/>
			<PopupDialog
				dialogTitle={<DialogTitle title="Notice" />}
				ref={(popupDialog) => { this.popupDialog = popupDialog; }}
			>
				<View>
				<Text>If left blank, it will add a song with the name A and the artist A</Text>
				</View>
			</PopupDialog>
			</View>
		  )
	}
}

var styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: 'slategrey'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white'
    },
    activeTitle: {
      color: 'red',
    },
  });
  const mapState = (state = {}) => {
      return {...state};
  };
  
  const mapDispatch = (dispatch) => {
      return {
          addAction:(song) => {
              dispatch(addAction(song))
          }, 
      }
  };
  
export default connect(mapState, mapDispatch)(AddSongScreen)