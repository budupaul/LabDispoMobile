/*
	Define the actions to be used by the application (type and parameters)
*/
export function logInAction(username, password){  
    return {
        type:'LOGIN',
        username,
		password
    }
}
export function editAction(title,artist, id){ 
    return {
        type:'EDIT',
        title,
		artist,
		id
    }
}
export function addAction(song){  
	console.log(song);
    return {
        type:'ADD',
        song
    }
}
export function deleteAction(index){  
	console.log(index);
    return {
        type:'DELETE',
        index
    }
}
export function populateAction(){  
	//console.log(songs);
    return {
        type:'POPULATE',
        //songs
    }
}