import React, { Component } from 'react';
import {Provider} from 'react-redux';
import RouteConfig from './router/routerTransition';
import store from './store/store.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <RouteConfig />
        </Provider>      
  	  </div>
    );
  }
}

export default App;
