import React,{Component} from 'react';
import { ActivityIndicator, TextInput, Alert, Button, TouchableOpacity, ListView, Text, View, AppRegistry, FlatList, StyleSheet} from 'react-native';
import {editAction} from '../Services/Actions/BasicActions';
import { AreaChart, AreaStackChart } from 'react-native-svg-charts'
import { connect } from 'react-redux';
import * as shape from 'd3-shape'

class SecondScreen extends Component{

	state = {artist: 'Lala', title:'Band'}

	constructor(props){
		super(props);
		const {navigation} = this.props.navigation;

	}
	/*
		When we have to edit the song, we send an editAction to the reducer and then return to the home page
	*/	
	editSong(title, artist, index){
		this.props.editAction(title,artist,index);
		this.props.navigation.navigate('Home');
	}
	render(){
		//const { params } = this.props.navigation.state;
		//{"navigation":{"state":{"params":{"title":
		//	81370-2","routeName":"Song"}}}
		var index = this.props.navigation.state.params.index;
		var music = this.props.basic.songs.list;
		var title = music[index].title;
		var artist= music[index].artist;
		console.log(this.props.navigation.state.params);
		return (
			<View>
			<Text>{title}</Text>
			<Text>{artist}</Text>
			<Text></Text>
			<Text>Edit title:</Text>
			<TextInput onChangeText={(text) => title = {text}.text} style={styles.input} editable={true}/>

			<Text></Text>
			<Text>Edit artist:</Text>
			<TextInput onChangeText={(text) => artist = {text}.text} style={styles.input} editable={true}/>
			
			<Button
              onPress={() => this.editSong(title, artist, index)}
              title="Go home"
            />
			<AreaChart
                    style={ { height: 200 } }
                    dataPoints={ [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ] }
                    fillColor={ 'rgba(134, 65, 244, 0.2)' }
                    strokeColor={ 'rgb(134, 65, 244)' }
                    contentInset={ { top: 30, bottom: 30 } }
                    curve={shape.curveNatural}
                />
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
	chart: {
        width: 200,
        height: 200,
    },
  });
  const mapState = (state = {}) => {
      return {...state};
  };
  
  const mapDispatch = (dispatch) => {
      return {
          editAction:(title,artist, id) => {
              dispatch(editAction(title,artist, id))
          }, 
      }
  };
  
export default connect(mapState, mapDispatch)(SecondScreen)