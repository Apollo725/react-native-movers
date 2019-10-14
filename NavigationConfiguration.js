import {
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';
import { 
  StackNavigator, 
  DrawerNavigator,
  NavigationActions
} from 'react-navigation'; // 1.0.0-beta.17

import LoginScreen from './app/components/Login/LoginScreen';
import MyMovesScreen from './app/components/MyMoves/MyMovesScreen';
import MoveDetailScreen from './app/components/MoveDetail/MoveDetailScreen';
import MyMailsScreen from './app/components/MyMails/MyMailsScreen';
import ComposeScreen from './app/components/Compose/ComposeScreen';
import DrawerMenu from './app/components/Drawer/DrawerMenu';
// import Drawer from './app/components/Drawer/Drawer'

const msn = StackNavigator({
  MyMoves: {screen: MyMovesScreen},
  MoveDetailVar: { screen: MoveDetailScreen },
  MyMails: {
    screen: MyMailsScreen,
  },
  Compose: { screen: ComposeScreen }
})
// const mmn = StackNavigator({
//   mm: {screen: MyMailsScreen},

// })
// const ComposeScreenStack = StackNavigator({
//   ComposeScreenVar: { screen: ComposeScreen }
// })
// const MoveDetailStack = StackNavigator({
  
// })
const Drawer = DrawerNavigator({
  // MoveDetail: {
  //   screen: MoveDetailStack
  // },

  MyMove: {
    screen: msn,
  },
  
  // Compose: {
  //   screen: ComposeScreenStack
  // },
  
}, {
  contentComponent: DrawerMenu,
drawerWidth:200
});

// Drawer.navigationOptions = {
//   // title: 'Book A Move',
// };

const LoginStack = StackNavigator({
  Log: { screen: LoginScreen }
})




export const MainNav = StackNavigator({
  Login: { screen: LoginStack },
  DrawerScreen: {screen: Drawer},
  
}, {

   headerMode: 'none',
  cardStyle: {  //To avoid status bar overlapping
   paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
  },
  tintColor: '#ffffff'
});

let initialNavState = MainNav.router.getStateForAction(
  NavigationActions.init()
);

export const MainNavReducer = (state = initialNavState, action) => {
  const nextState = MainNav.router.getStateForAction(action, state);
  return nextState || state;
};

global.active_screen = '';
