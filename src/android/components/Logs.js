'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
} from 'react-native';

import { formatAndroidLogs } from '../../utils/logFormatter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Logs extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    const dataSource = this.dataSource.cloneWithRows(formatAndroidLogs(this.props.logEntries));

    return (
      <ListView
        dataSource={dataSource}
        enableEmptySections={true}
        renderRow={(rowData) =>
          <View style={{ backgroundColor: rowData.style.backgroundColor }}>
            <Text style={{ color: rowData.style.color }}>{ rowData.text }</Text>
          </View>
        }
      />
    );
  }
}


export default Logs;
