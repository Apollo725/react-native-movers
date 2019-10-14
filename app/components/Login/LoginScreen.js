import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { loginAction } from '../../actions';
import { NavigationActions } from 'react-navigation';

const window = Dimensions.get('window');

class App extends React.Component {

  static navigationOptions = {
    title: 'Login',
    headerLeft: null,
    headerTitleStyle: {
      alignSelf: 'center'
    },
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

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: [],
    }
  } 

  onPressGo = () => {
    this.props.login.error = null;
    const {navigate} = this.props.navigation;
    this.props.navigation.dispatch(loginAction({
      email: this.state.email, 
      password: this.state.password
    }));
  }

  render() {
    console.log(this.props)
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{width: 290, height: 54}}
            source={require('../../images/logo.png')}
          />
        </View>
        
        <View>
          <Text style={styles.textError}>{this.props.login.error}</Text>
          <TextInput
            autoCorrect={false}
            autoFocus={false}
            placeholder={'Enter Email'}
            style={styles.textInput}
            onChangeText={(text) => this.setState({['email']: text})}
            value={this.state['email']}
            underlineColorAndroid='transparent'
            placeholderTextColor={'#777'}
            containerStyle={styles.textContainer}
          />
          <Text style={styles.textError}>{this.state.errors['email']}</Text>
        </View>
        <View>
          <TextInput
            autoCorrect={false}
            autoFocus={false}
            placeholder={'Enter Password'}
            style={styles.textInput}
            onChangeText={(text) => this.setState({['password']: text})}
            value={this.state['password']}
            underlineColorAndroid='transparent'
            placeholderTextColor={'#777'}
            secureTextEntry={true}
          />
          <Text style={styles.textError}>{this.state.errors['password']}</Text>
        </View>
        <TouchableOpacity onPress={this.onPressGo} disabled={this.props.login.isFetching} style={styles.goButton}>
          <Text style={styles.goButtonText}>{'Login'}</Text>
          {this.props.login.isFetching &&
            <ActivityIndicator
                   animating = {true}
                   color = '#e87d7d'
                   size = "small"/>
          }
        </TouchableOpacity>
        <View style={{ flex: 2}}></View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
    return {login: state.login}
}

const LoginScreen = connect(
  mapStateToProps
)(App)

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eaf6',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 2,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
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
    fontSize: 20,
    paddingHorizontal: 10
  }
});
  