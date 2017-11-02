import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import {
  Container,
  Header,
  Content,
  Title,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  Spinner,
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import logFormatter from '../utils/logFormatter';

class LogsScene extends Component {
  static navigationOptions = {
    title: 'Logs'
  };

  constructor(props) {
    super(props);
    this.state = {
      logEntries: null
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      BackgroundGeolocation.getLogEntries(100, logEntries => {
        this.setState({ logEntries: logFormatter(logEntries) });
      });
    });
  }

  renderContent(logEntries) {
    return (
      <List
        dataArray={logEntries}
        renderRow={entry => (
          <ListItem
            style={{
              backgroundColor: entry.style.backgroundColor
            }}
          >
            <Text
              style={{
                color: entry.style.color
              }}
            >
              {entry.text}
            </Text>
          </ListItem>
        )}
      />
    );
  }

  render() {
    const logEntries = this.state.logEntries;
    return (
      <Container>
        <Content>
          {(() => {
            if (logEntries) return this.renderContent(logEntries);
            return <Spinner />;
          })()}
        </Content>
      </Container>
    );
  }
}

export default LogsScene;
