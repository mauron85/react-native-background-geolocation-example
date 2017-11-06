import React, { Component } from 'react';
import { InteractionManager, View, Text } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Body,
  Right,
  Button,
  Icon,
  Input,
  Switch,
  List,
  ListItem
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import { i18n } from '../i18n';

export const providers = [
  {
    label: 'Distance Filter',
    value: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER
  },
  {
    label: 'Activity',
    value: BackgroundGeolocation.ACTIVITY_PROVIDER
  },
  {
    label: 'Raw',
    value: BackgroundGeolocation.RAW_PROVIDER
  }
];

class Config extends Component {
  static defaultProps = {
    locationProvider: 0,
    desiredAccuracy: 0,
    stationaryRadius: 0,
    distanceFilter: 0,
    debug: false,
    startForeground: false,
    stopOnStillActivity: false,
    stopOnTerminate: true,
    maxLocations: 1000,
    url: '',
    syncUrl: '',
    syncThreshold: 100
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onPress(key) {
    this.props.onEdit(key);
  }

  onChange(val, key) {
    this.props.onChange(key, val);
  }

  render() {
    const {
      locationProvider,
      desiredAccuracy,
      stationaryRadius,
      distanceFilter,
      debug,
      startForeground,
      stopOnStillActivity,
      stopOnTerminate,
      maxLocations,
      url,
      syncUrl,
      syncThreshold
    } = this.props;
    return (
      <List style={{ flex: 1, backgroundColor: '#fff' }}>
        <ListItem itemDivider>
          <Text>General</Text>
        </ListItem>
        <ListItem onPress={() => this.onPress('desiredAccuracy')}>
          <Body>
            <Text>{i18n.desiredAccuracy}</Text>
            <Text note>{desiredAccuracy} [meters]</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={() => this.onPress('stationaryRadius')}>
          <Body>
            <Text>{i18n.stationaryRadius}</Text>
            <Text note>{stationaryRadius} [meters]</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={() => this.onPress('distanceFilter')}>
          <Body>
            <Text>{i18n.distanceFilter}</Text>
            <Text note>{distanceFilter} [meters]</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem>
          <Body>
            <Text>{i18n.debug}</Text>
          </Body>
          <Right>
            <Switch
              value={debug}
              onValueChange={val => this.onChange(val, 'debug')}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Body>
            <Text>{i18n.startForeground}</Text>
          </Body>
          <Right>
            <Switch
              value={startForeground}
              onValueChange={val => this.onChange(val, 'startForeground')}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Body>
            <Text>{i18n.stopOnStillActivity}</Text>
          </Body>
          <Right>
            <Switch
              value={stopOnStillActivity}
              onValueChange={val => this.onChange(val, 'stopOnStillActivity')}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Body>
            <Text>{i18n.stopOnTerminate}</Text>
          </Body>
          <Right>
            <Switch
              value={stopOnTerminate}
              onValueChange={val => this.onChange(val, 'stopOnTerminate')}
            />
          </Right>
        </ListItem>
        <ListItem onPress={() => this.onPress('locationProvider')}>
          <Body>
            <Text>{i18n.locationProvider}</Text>
            <Text note>{providers[locationProvider].label}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem itemDivider>
          <Text>Location sync</Text>
        </ListItem>
        <ListItem onPress={() => this.onPress('maxLocations')}>
          <Body>
            <Text>{i18n.maxLocations}</Text>
            <Text note>{maxLocations}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={() => this.onPress('url')}>
          <Body>
            <Text>{i18n.url}</Text>
            <Text note>{url}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={() => this.onPress('syncUrl')}>
          <Body>
            <Text>{i18n.syncUrl}</Text>
            <Text note>{syncUrl}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={() => this.onPress('syncThreshold')}>
          <Body>
            <Text>{i18n.syncThreshold}</Text>
            <Text note>{syncThreshold}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    );
  }
}

export default Config;
