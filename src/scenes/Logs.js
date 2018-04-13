import React, { PureComponent } from 'react';
import { InteractionManager, FlatList } from 'react-native';
import {
  Container,
  Header,
  Right,
  Left,
  Content,
  Body,
  Title,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  Spinner
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const STYLES = Object();
STYLES['ERROR'] = { backgroundColor:'white',color:'red' };
STYLES['WARN'] = { backgroundColor:'black',color:'yellow' };
STYLES['INFO'] = { backgroundColor:'white',color:'blue' };
STYLES['TRACE'] = { backgroundColor:'white',color:'black' };
STYLES['DEBUG'] = { backgroundColor:'white',color:'black' };

function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function formatLogEntry(logEntry) {
  const d = new Date(Number(logEntry.timestamp));
  const dateStr = [d.getFullYear(), padLeft(d.getMonth()+1,2), padLeft(d.getDate(),2)].join('/');
  const timeStr = [padLeft(d.getHours(),2), padLeft(d.getMinutes(),2), padLeft(d.getSeconds(),2)].join(':');
  return {
    eventId: logEntry.id || logEntry.timestamp,
    style: STYLES[logEntry.level],
    text: ['[', dateStr, ' ', timeStr, ']\t', logEntry.message, logEntry.stackTrace ? logEntry.stackTrace : ''].join('')
  };
}

class LogsScene extends PureComponent {
  static navigationOptions = {
    title: 'Logs',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      logEntries: [],
    };
    this.rowLimit = 100;
    this.lastEventId = 0; // intentionally not set in state as it's asynchronnous
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refresh();
    });
  }

  refresh() {
    this.fetchLogs(0);
  }

  fetchLogs(lastEventId) {
    if (lastEventId < 0) {
      return;
    }
    if (lastEventId == 0) {
      this.setState({ isRefreshing: true, logEntries: [] });
    }
    BackgroundGeolocation.getLogEntries(this.rowLimit, lastEventId, 'DEBUG', newLogEntries => {
      const { logEntries } = this.state
      const lastEventId = newLogEntries.length > 0 ? newLogEntries[newLogEntries.length - 1].id : -1;
      this.lastEventId = lastEventId;
      this.setState({
        isRefreshing: false,
        logEntries: logEntries.concat(newLogEntries),
      });
    });
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => {
    const entry = formatLogEntry(item);
    return (
      <ListItem
        style={{
          marginLeft: 2,
          backgroundColor: entry.style.backgroundColor
        }}
      >
        <Text
          style={{
            color: entry.style.color
          }}
        >
          {`${entry.eventId}:${entry.text}`}
        </Text>
      </ListItem>
    );
  };

  _onEndReached = () => {
    this.fetchLogs(this.lastEventId);
  };

  renderContent(logEntries) {
    return (
      <FlatList
        style={{ flex: 1, backgroundColor: '#fff' }}
        data={logEntries}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onEndReached={this._onEndReached}
      />
    );
  }

  render() {
    const { logEntries, isRefreshing } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Logs</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.refresh}>
              <Icon name="refresh" />
            </Button>
          </Right>
        </Header>
        <Content>
          {(() => {
            if (isRefreshing) {
              return <Spinner />;
            }
            return this.renderContent(logEntries);
          })()}
        </Content>
      </Container>
    );
  }
}

export default LogsScene;
