import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { myMovesAction } from '../../actions';
import { NavigationActions } from 'react-navigation';

class App extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const {navigate} = navigation;
    return {
      title: 'My Moves',
      drawerLabel: 'My Moves',
      headerLeft: null,
      headerLeft: 
        <Icon
          name='menu'
          type='entypo'
          size={25}
          color='#fff'
          iconStyle={{ padding: 10}}
          onPress={() => navigate('DrawerOpen')} />, 
      headerRight: 
        <Icon
          raised
          name='envelope'
          type='font-awesome'
          size={16}
          color='#264b7f'
          onPress={() => navigate('MyMails')} />, 
      headerTitleStyle: {
        color: 'white',
        fontWeight: '700',
        justifyContent: 'space-between',
        alignSelf: 'center'
      },
      headerStyle: {
        backgroundColor: '#264b7f',
        shadowOpacity: 0,
      }
    };
  };

  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
      this.props.navigation.dispatch(myMovesAction());
  }

  render() {
    const {navigate} = this.props.navigation;
    console.log(this.props)
    return (
      <View style={styles.container}>
      {
        this.props.moves.isFetching &&
        <ActivityIndicator
                   animating = {true}
                   color = '#e87d7d'
                   style={{padding: 20}}
                   size = "large"/>
      }
      
      {  'moves' in this.props && this.props.moves.data &&
        <ScrollView>
          <TouchableNativeFeedback>
          <List containerStyle={{ marginBottom: 20 }}>
          {
            this.props.moves.data.map((l, i) => (
              <ListItem
                key={i}
                leftIcon={
                  <Icon
                    name='truck'
                    type='font-awesome'
                    color='#a7cef7'
                  />
                }
                title={l.move_contract_name} 
                titleStyle={{ fontSize: 16, paddingLeft: 15, fontWeight: '400' }}
                hideChevron={true}
                onPress={() => this.props.onMoveClick(l.id, l.move_contract_name)}
              />
            ))
          }
          </List>
          </TouchableNativeFeedback>
        </ScrollView>
      }
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {moves: state.moves}
}

const mapDispatchToProps = dispatch => {
  return {
    onMoveClick: (id, contract_name) => {
      dispatch(NavigationActions.navigate({ 
          routeName: 'MoveDetailVar',
          params: {
            id,
            contract_name
          }
       }))
    }
  }
}

const MyMovesScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default MyMovesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eaf6',
  },
 
});
