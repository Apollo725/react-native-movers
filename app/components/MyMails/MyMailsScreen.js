import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { myMailsAction } from '../../actions';
import { NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';


const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];

const CONTENT = [
  {
    title: 'First',
    content: BACON_IPSUM,
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
  },
];


const list = [
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
    ];

    const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
    value: false,
  },
];

class App extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const {navigate} = navigation;
    return {
      title: 'My Mail',
      drawerLabel: 'My Mail',
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
          name='truck'
          type='font-awesome'
          size={16}
          color='#264b7f'
          onPress={() => navigate('MyMoves')} />, 
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
      collapsed: true,
    };
  }

  componentWillMount() {
      this.props.navigation.dispatch(myMailsAction());
  }

  _keyExtractor = (item, index) => item.main.id;

  _renderItem(data, i) {
    console.log(data)
    return (
      <View style={{flexDirection: 'column', 
    justifyContent: 'space-between',backgroundColor: 'white', padding: 10}}>
        <View style={{ flexDirection: 'row'}}>
          <Icon
            name='truck'
            size={16}
            type='font-awesome'
            color='#a7cef7'
          />
          <Text style={{ padding: 5, color: '#565656',
    fontWeight: '500' }}>Test Jan18 Van</Text>
        </View>
        <Text style={{color: '#565656'}}> Message content</Text>
      <Text style={{  fontSize: 10, position: 'absolute', top: 5, right:5 }}>{data.item.created_at}</Text>
        
    </View>
    );
  }

  _renderSeparator = () => {
    return (
      <View style={{height:1, backgroundColor: '#ccc'}}></View>
    )
  }

  render() {
    console.log(this.props)
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      {
        this.props.mails.isFetching &&
        <ActivityIndicator
           animating = {true}
           color = '#e87d7d'
           style={{padding: 20}}
           size = "large"
        />
      }
      
      {  'messages' in this.props.mails.data &&
        
        <FlatList 
          data={this.props.mails.data.messages}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
        />
      }
      </View>
    );
  }

}

const mapStateToProps = state => {
    return {mails: state.mails}
}

const MyMailsScreen = connect(
  mapStateToProps
)(App)

export default MyMailsScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eaf6',
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    marginTop: 1,
    borderTopWidth: 1,
    borderTopColor: '#eff0f1'

  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: 'white',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  buttonGroup: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'center',
    backgroundColor: '#21416e'
  },
  smallButton: {
    backgroundColor: '#7cbcff',
    borderRadius: 4,
    padding: 12,
    elevation: 4, //Android Shadow
    shadowOpacity: 0.3, //IOS Shadow
    shadowRadius: 3,
    shadowOffset: {
        height: 0,
        width: 0
    },
  },
  smallButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
});
