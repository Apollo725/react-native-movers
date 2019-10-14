import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { Divider } from 'react-native-elements';

import { NavigationActions } from "react-navigation";

class DrawerMenu extends Component {
  _navigate(route) {
    return this.props.navigation.dispatch(NavigationActions.navigate({ 
          routeName: route
       }))
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{width: 187, height: 35}}
            source={require('../../images/logo.png')}
          />
        </View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("MyMoves")}
        >
          <Text style={styles.menuItemText}>My Moves</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => this._navigate("MyMails")}
        >
          <Text style={styles.menuItemText}>My Mail</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0
  },
  menuItem: {
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 20,
    color: '#264b7f'
  },
  divider: {
    backgroundColor: '#eeeeee'
  },
  imageContainer: {
    backgroundColor: '#e1eaf6',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;