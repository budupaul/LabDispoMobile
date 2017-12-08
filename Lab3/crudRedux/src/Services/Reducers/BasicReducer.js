import { AsyncStorage } from 'react-native';
/*
	Create a reducer that deals with the actions
	It also creates an initial state with one song in it
*/
	
const basicReducer = (state={
    songs: {
		list: [
			{
				title : 'Aa',
				artist : 'bb'
			}
		]
	}
}, action) => {
    switch(action.type){
		//Deal with each action type
        case 'DEFAULT':
			var title = action.title;
			var artist = action.artist;
			var index = action.id;

            var songs =  cloneObject(state.songs) //clone the current state
			if (index !== -1) {
                songs.list[index].title = title;
				songs.list[index].artist = artist;

            }
            state = Object.assign({}, state, { songs: songs});
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
			return state;
		break;
		case 'ADD':
			var song = action.song;

            var songs =  cloneObject(state.songs) //clone the current state
            songs.list.push(song);
			//AsyncStorage.setItem('songs', songs.list);
            state = Object.assign({}, state, { songs: songs});
        break;
		case 'DELETE':
			var index = action.index;

            var songs =  cloneObject(state.songs) //clone the current state
            songs.list.splice(index, 1);
            state = Object.assign({}, state, { songs: songs});
        break;
		case 'persist/REHYDRATE':
		{

			// retrive stored data for reducer callApi
			const savedData = action.payload.callApi || InitialState;     
    
			return {
			...state, ...savedData
			};
		}
        default:
            break;
    }
    return state;
};
//Function used when needed to create a copy of the state
function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
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

