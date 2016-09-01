'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
  Modal,
} from 'react-native';

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Logs from './Logs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
  },
  button: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logEntries: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      BackgroundGeolocation.getLogEntries(100, (logEntries) => {
        this.setState({ logEntries });
      });
    }
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
        >
        <View style={styles.container}>
          <Logs logEntries={this.state.logEntries} />
        </View>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={this.props.onClose}>
            <Text style={styles.button}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}


export default Settings;
