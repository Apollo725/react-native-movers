import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  ActivityIndicator,
  Text,
  TextInput,
  Dimensions,
  FlatList
} from 'react-native';
import { List, ListItem, Icon, CheckBox } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { getStaffsAction, toggleStaff, composeAction } from '../../actions';
import { NavigationActions } from 'react-navigation';
import { ImagePicker } from 'expo';

const window = Dimensions.get('window');

class App extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const {navigate, goBack} = navigation;
    const { params = {} } = navigation.state; //To fix error contract_name is undefined
    if(params.data == 'New Message')
    {
      var icon = (
        <Icon
            raised
            name='envelope'
            type='font-awesome'
            size={16}
            color='#264b7f'
            onPress={() => goBack()} />
      )
    }
    else{
      var icon = (
        <Icon
            raised
            name='truck'
            type='font-awesome'
            size={16}
            color='#264b7f'
            onPress={() => goBack()} />
            )
    }
    
    return {
      title: params.data,
      headerLeft: 
        <Icon
          name='menu'
          type='entypo'
          size={25}
          color='#fff'
          iconStyle={{ padding: 10}}
          onPress={() => navigate('DrawerOpen')} />, 
      headerRight: icon, 
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
      name: '',
      nameEdit: false,
      selectedNames: [],
      subject: null,
      message: null,
      errors: [],
      loading: false,
      alertStatus: false,
      image: null,
      
    };

      
  }

  componentWillMount() {
    this.props.navigation.dispatch(getStaffsAction());
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (name) => {
    this.props.navigation.dispatch(toggleStaff(name));
    var index = this.state.selectedNames.indexOf(name);
    console.log(index)
    if(index >= 0)
    {
      var newArray = this.state.selectedNames
      console.log('New:'+newArray)
      newArray.splice(index, 1);
      console.log('New:'+newArray)
      this.setState({selectedNames: newArray });
    }
    else
      this.setState({ selectedNames: [...this.state.selectedNames, name]});
  };

  _renderItem = ({ item }) =>
  {
    return (
        
                <CheckBox
                  title={item.name}
                  checked={item.checked}
                  checkedColor='#264b7f'
                  containerStyle={{width: 0.75 * window.width, height: 40,  margin: 0}}
                  onPress={() => this._onPressItem(item.name)}
                />
    )
  }

  _filteredData = () => {
    return this.props.staffs.data(function (el) {
      return (el.name.includes(this.state.name))
    });
  }

  sendMail = () => {
    selectedStaffs = this.props.staffs.data.filter(function (el) {
      return (el.checked == true)
    });
    var ids = [];
    selectedStaffs.forEach((staff) => {
      ids.push('task_'+staff.id)
    })
    
    var data = {
      to: ids,
      subject: this.state.subject,
      body: this.state.message,
      urgent: '0',
      task: '13'
    };
    this.props.navigation.dispatch(composeAction(data));
    this.setState({ alertStatus: true })
  }

  fileUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
        

  render() {
    const { selectedItems } = this.state;
    const {navigate} = this.props.navigation;
    console.log(this.props)
    return (

      <View style={styles.container}>
        {
          this.state.alertStatus &&
          <View style={styles.alertBox}>
            <Text style={styles.alertText}> Message Sent </Text>
            <Text 
              style={styles.alertClose}
              onPress={() => this.setState({ alertStatus: false})}
            > X </Text>
          </View>
        }
        
        <ScrollView>
          <View>
            <TextInput
              autoCorrect={false}
              autoFocus={false}
              
              onFocus={() => this.setState({ nameEdit: true})}
              placeholder={'Name'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({['name']: text})}
              value={this.state['name']}
              underlineColorAndroid='transparent'
              placeholderTextColor={'#777'}
              containerStyle={styles.textContainer}
            />
            <Text style={styles.textError}>{this.state.errors['name']}</Text>
          </View>
          {  this.props.staffs.data.length > 0 && this.state.nameEdit &&
          <View style={{alignItems: 'center'}}>
            <View style={{ height : 200}}>
              <FlatList
                    data={this.props.staffs.data.filter((el) => {return (el.name.includes(this.state.name))})}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                
            </View>
            <TouchableOpacity onPress={() => {this.setState({ nameEdit: false});this.subInput.focus();}} style={styles.doneButton}>
                <Text style={styles.goButtonText}>{'DONE'}</Text>
            </TouchableOpacity>
          </View>
          }
          <View>
            <TextInput
              autoCorrect={false}
              autoFocus={false}
              ref={(input) => { this.subInput = input; }}
              placeholder={'Subject'}
              style={styles.textInput}
              onChangeText={(text) => this.setState({['subject']: text})}
              value={this.state['subject']}
              underlineColorAndroid='transparent'
              placeholderTextColor={'#777'}
            />
            <Text style={styles.textError}>{this.state.errors['subject']}</Text>
          </View>
          <View>
            <TextInput
              multiline={true}
              numberOfLines={4}
              editable = {true}
              autoCorrect={false}
              autoFocus={false}
              placeholder={'Message'}
              style={[styles.textInput, styles.textHeight]}
              onChangeText={(text) => this.setState({['message']: text})}
              value={this.state['message']}
              underlineColorAndroid='transparent'
              placeholderTextColor={'#777'}
            />
            <Text style={styles.textError}>{this.state.errors['password']}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.fileUpload} style={styles.fileButton}>
              <Text style={styles.fileButtonText}>{'Choose File'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.sendMail} disabled={false} style={styles.goButton}>
            <Text style={styles.goButtonText}>{'SEND'}</Text>
            {this.props.compose.isFetching &&
              <ActivityIndicator
                     animating = {true}
                     color = '#e87d7d'
                     size = "small"/>
            }
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {staffs: state.staffs, compose: state.compose}
}

const mapDispatchToProps = dispatch => {
  return {
    onMoveClick: (id, contract_name) => {
      dispatch(NavigationActions.navigate({ 
          routeName: 'MoveDetail',
          params: {
            id,
            contract_name
          }
       }))
    }
  }
}

const ComposeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ComposeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eaf6',
    alignItems: 'center'
  },
  textInput: {
    width: 0.8 * window.width,
    height: 50,
    fontSize: 20,
    borderColor: '#264b7f',
    borderWidth: 2,
    borderRadius: 3,
    textAlign: 'center',
    color: '#264b7f',
    marginTop: 20,
    padding: 5,
    backgroundColor: 'white',
  },
  textError: {
    color: 'red'
  },
  doneButton: {
    width: 0.8 * window.width,
    backgroundColor: '#264b7f',
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  goButton: {
    width: 0.8 * window.width,
    backgroundColor: '#264b7f',
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  goButtonText: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10
  },
  textHeight: {
    height: 120
  },
  alertBox: {
    width: 0.8 * window.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#dff0d8', 
    padding: 5,
    borderRadius: 4,
    borderColor: '#d6e9c6',
    borderWidth: 1,
    marginTop: 10
  },
  alertText: {
    color: '#468847'
  },
  alertClose: {
    color: '#468847'
  },
  fileButton: {
    width: 0.4 * window.width,
    backgroundColor: '#e7e7e7',
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#a9a9a9',
    borderWidth: 1,
  },
  fileButtonText: {
    color: 'black',
  }
});
