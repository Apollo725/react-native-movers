import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
class FloatingLabelText extends Component {


  render() {
    console.log(this.props)
    const { label, Boxstyle,  ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: 2,
      fontSize: 10,
      color: '#000',
    };

    const inputStyle = {
      borderColor: '#d0d0d0',
      borderWidth: 1,
      borderRadius: 3,
      textAlign: 'center',
      padding: 5,
      height: 26, 
      fontSize: 12,
      borderBottomWidth: 1, 
      borderBottomColor: '#555'
    }

    return (
      <View style={[ Boxstyle, { paddingTop: 18, marginHorizontal: 2 }]}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <Text {...props}
          style={[ inputStyle]}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}

export default FloatingLabelText;