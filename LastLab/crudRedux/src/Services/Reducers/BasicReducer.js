import { AsyncStorage } from 'react-native';
/*
	Create a reducer that deals with the actions
	It also creates an initial state with one song in it
*/
	
const basicReducer = (state={songs:
	{
		list: []
	}}, action) => {
    switch(action.type){
		//Deal with each action type
        case 'EDIT':
			var id = action.id;
			var url = 'http://192.168.0.136:3000/api/songs';
			var fin = url + '/' + id;
			var details = {
				'title': action.title,
				'artist': action.artist
			};
			data = encodeForm(details);
			
			fetch(fin, {  
				method: 'PUT',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							},
				body: data
			});
			updateSongList(state);
            /*var songs =  cloneObject(state.songs) //clone the current state
			if (index !== -1) {
                songs.list[index].title = title;
				songs.list[index].artist = artist;

            }
            state = Object.assign({}, state, { songs: songs});*/
        break;
		case 'POPULATE':
			/*if ( state.songs !== undefined){
				var songs =  cloneObject(state.songs) //clone the current state
				
			}
			else{
				var songs = new SongList();
				
			}
			AsyncStorage.getItem('songs').then( result => {
				var songs = new SongList();
				console.log('aaaaaaaaaaaaaaa');
				console.log(result);
				if (result != null){
					songs.list = result;
				}
				state = Object.assign({}, state, { songs: songs});
				
				
			});*/
			/*console.log('aaa');
            if (song != null){
				songs.list = song;
			}
			console.log(songs);*/
            //state = Object.assign({}, state, { songs: songs});
			//console.log(state);
			/*state={
            ...state,
            songs: action.songs
        }*/
			/*fetch('http://localhost:3000/api/songs').then((res) => 
				res.json()
			);*/
			updateSongList(state);
			/*AsyncStorage.setItem('stateOff', state);
			AsyncStorage.getItem('stateOff').then((stateOff) => {
				console.log('aaaa');
				console.log(stateOff);
			});*/
			
		break;
		case 'ADD':
			var song = action.song;
			var details = {
				'title': song.title,
				'artist': song.artist
			};
			data = encodeForm(details);
			
			fetch('http://192.168.0.136:3000/api/songs', {  
				method: 'POST',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							},
				body: data
			});
			updateSongList(state);
			
            /*var songs =  cloneObject(state.songs) //clone the current state
            songs.list.push(song);
			//AsyncStorage.setItem('songs', songs.list);
            state = Object.assign({}, state, { songs: songs});*/
        break;
		case 'DELETE':
			var index = action.index;
			console.log('Del');
			console.log(index);
			var url = 'http://192.168.0.136:3000/api/songs';
			console.log(url);
			var fin = url + '/' + index;
			console.log(fin);
			fetch(fin, {  
				method: 'DELETE',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							}
			});
			updateSongList(state);
            /*var songs =  cloneObject(state.songs) //clone the current state
            songs.list.splice(index, 1);
            state = Object.assign({}, state, { songs: songs});)*/
        break;
		case 'LOGIN':
			var user = action.username;
			var pass = action.password;
			var details = {
				'username': action.username,
				'password': action.password
			};
			data = encodeForm(details);
			fetch('http://192.168.0.136:3000/api/user', {  
				method: 'POST',
				headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
							},
				body: data
			}).then((response) => {console.log(response._bodyText); state.loggedAs = response._bodyText})
			  /*.then((responseData) => {
					console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA');
				    console.log(responseData);
					
					//state.loggedAs = JSON.parse(JSON.stringify(responseData));
				})*/
			  .catch( function(error){
					console.log(error);
				});
        default:
            break;
    }
    return state;
};
//Function used when needed to create a copy of the state
function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function encodeForm(details){
	var formBody = [];
	for (var property in details) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(details[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return formBody;
}
function updateSongList(state){
	AsyncStorage.getItem('stateOff').then((data) => {
		state.songs.list = JSON.parse(data);
	});
	console.log('Aaa');
	console.log(state);
	fetch('http://192.168.0.136:3000/api/songs')
		.then((response) => response.json())
		.then((responseData) => {
			state.songs.list = JSON.parse(JSON.stringify(responseData));
			AsyncStorage.setItem('stateOff', JSON.stringify(responseData));
		})
		.catch( function(error){
				console.log(error);
			});
	
}
export class SongList{
	list = [];
	constructor(){
		
	}
	push( song ){
		this.list.push(song);
	}
}
export default basicReducer;

