'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ListView,
  Text,
  Modal,
} from 'react-native';

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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

class Logs extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
    const dataSource = this.dataSource.cloneWithRows(this.props.logFormatter(this.state.logEntries));
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
        >
        <View style={styles.container}>
          <ListView
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={(rowData) =>
              <View style={{ backgroundColor: rowData.style.backgroundColor }}>
                <Text style={{ color: rowData.style.color }}>{ rowData.text }</Text>
              </View>
            }
          />
        </View>
        <TouchableOpacity onPress={this.props.onClose}>
          <View style={styles.toolbar}>
            <Text style={styles.button}>Dismiss</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}


export default Logs;
