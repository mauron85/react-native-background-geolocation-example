import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Body,
  Button,
  Icon,
  List,
  ListItem,
  Text
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const styles = StyleSheet.create({
  iconStyle: {
    color: '#0A69FE'
  }
});

class SettingsScene extends Component {
  static navigationOptions = {
    title: 'Menu'
  };

  navigate(scene) {
    this.props.navigation.navigate(scene);
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem icon onPress={() => this.navigate('Logs')}>
              <Left>
                <Icon name="ios-archive" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Plugin Logs</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={() => this.navigate('PendingLocations')}>
              <Left>
                <Icon name="ios-plane" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Pending Locations</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={() => this.navigate('Config')}>
              <Left>
                <Icon name="ios-settings" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Plugin Configuration</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={BackgroundGeolocation.showAppSettings}>
              <Left>
                <Icon name="ios-construct" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Show App Settings</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={BackgroundGeolocation.showLocationSettings}>
              <Left>
                <Icon name="ios-compass" style={styles.iconStyle} />
              </Left>
              <Body>
                <Text>Show Location Settings</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default SettingsScene;
