import React from 'react';
import { BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store';
import MainNavigation from './Navigation';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}

export default App;
