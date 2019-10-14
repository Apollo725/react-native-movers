
import React from 'react';
import { BackHandler, Text, AsyncStorage } from "react-native";
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { MainNav } from './NavigationConfiguration';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
 return {
  navigationState: state.nav,
  };
};

class MainNavigation extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {

    /* Initial Screen Loading */
    const token = await AsyncStorage.getItem('access_token');
    const {dispatch} = this.props;
    this.setState({ isLoading: false});
    if(token) {  
      dispatch(NavigationActions.navigate({ routeName: 'MyMoves' }))
    }

    // Back Button Handler
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {

    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigationState } = this.props;
    let route = this.getRouteName(navigationState);
    if (route == 'Login' || route == 'MyMoves') {
      BackHandler.exitApp();
      return false; // return false to prevent going back after exiting
    }
    dispatch(NavigationActions.back());
    return true; // return true allow go back
  };

  //To get current active screen
  getRouteName = state => {
    if(state.index == undefined)
    {
      return state.routeName;
    }
    else
    {
      return this.getRouteName(state.routes[state.index])
    }
  }
  
  render() {
    const { dispatch, navigationState } = this.props
    console.log(this.state)
    if(!this.state.isLoading)
    {
      return (
        <MainNav
          navigation={
            addNavigationHelpers({
              dispatch: dispatch,
              state: navigationState,
            })
          }
        />
      );
    }
    else {
      return null;
    }
    
  }
}

export default connect(mapStateToProps)(MainNavigation)
