import React from 'react';
import Root from './src';
import {Provider} from 'react-redux'
import store from './src/Services/store';
//We initialize the app into a provider for the redux container
export default App = () =>{
  return (
    <Provider store={store}>    
      <Root />
    </Provider>
  )
}
