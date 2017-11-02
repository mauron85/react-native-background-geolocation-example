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

class ConfigScene extends Component {
  static defaultProps = {
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
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  onPress(key) {
    this.props.onEdit(key);
  }

  onChange(val, key) {
    this.props.onChange(val, key);
  }

  onChangeNumber(val, key) {
    this.props.onChangeNumber(val, key);
  }

  render() {
    const {
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
      <List>
        <ListItem itemDivider>
          <Text>General</Text>
        </ListItem>
        <ListItem onPress={() => this.onPress('desiredAccuracy')}>
          <Body>
            <Text>Desired Accuracy</Text>
          </Body>
          <Right>
            <Text>{desiredAccuracy}</Text>
            <Icon name="arrow-forward" />
          </Right>
          {/* <InputGroup>
            <Input
              inlineLabel
              keyboardType="numeric"
              label="Desired Accuracy"
              value={config.desiredAccuracy}
              onChangeText={val => this.onChangeNumber(val, 'desiredAccuracy')}
            />
          </InputGroup> */}
        </ListItem>
        <ListItem onPress={() => this.onPress('stationaryRadius')}>
          <Body>
            <Text>Stationary Radius</Text>
          </Body>
          <Right>
            <Text>{stationaryRadius}</Text>
            <Icon name="arrow-forward" />
          </Right>

          {/* <InputGroup>
            <Input
              keyboardType="numeric"
              inlineLabel
              label="Stationary Radius"
              value={config.stationaryRadius}
              onChangeText={val => this.onChangeNumber(val, 'stationaryRadius')}
            />
          </InputGroup> */}
        </ListItem>
        <ListItem onPress={() => this.onPress('distanceFilter')}>
          <Body>
            <Text>Distance Filter</Text>
          </Body>
          <Right>
            <Text>{distanceFilter}</Text>
            <Icon name="arrow-forward" />
          </Right>

          {/* <InputGroup>
            <Input
              keyboardType="numeric"
              inlineLabel
              label="Distance Filter"
              value={config.distanceFilter}
              onChangeText={val => this.onChangeNumber(val, 'distanceFilter')}
            />
          </InputGroup> */}
        </ListItem>
        <ListItem>
          <Body>
            <Text>Debug</Text>
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
            <Text>Start Foreground</Text>
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
            <Text>Stop On Still</Text>
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
            <Text>Stop On Terminate</Text>
          </Body>
          <Right>
            <Switch
              value={stopOnTerminate}
              onValueChange={val => this.onChange(val, 'stopOnTerminate')}
            />
          </Right>
        </ListItem>
        <ListItem itemDivider>
          <Text>Location sync</Text>
        </ListItem>
        <ListItem onPress={() => this.onPress('interval')}>
          <Body>
            <Text>Max. Locations</Text>
          </Body>
          <Right>
            <Text>{maxLocations}</Text>
            <Icon name="arrow-forward" />
          </Right>

          {/* <InputGroup>
            <Input
              inlineLabel
              keyboardType="numeric"
              label="Max. Locations"
              value={config.maxLocations}
              onChangeText={val => this.onChangeNumber(val, 'maxLocations')}
            />
          </InputGroup> */}
        </ListItem>
        <ListItem onPress={() => this.onPress('interval')}>
          <Body>
            <Text>Post url.</Text>
          </Body>
          <Right>
            <Text>{url}</Text>
            <Icon name="arrow-forward" />
          </Right>

          {/* <InputGroup>
            <Input
              inlineLabel
              label="Post url."
              value={config.url || 'http://'}
              onChangeText={val => this.onChange(val, 'url')}
            />
          </InputGroup> */}
        </ListItem>
        <ListItem onPress={() => this.onPress('interval')}>
          <Body>
            <Text>Sync url.</Text>
          </Body>
          <Right>
            <Text>{syncUrl}</Text>
            <Icon name="arrow-forward" />
          </Right>

          {/* <InputGroup>
            <Input
              inlineLabel
              label="Sync url."
              value={config.syncUrl || 'http://'}
              onChangeText={val => this.onChange(val, 'syncUrl')}
            />
          </InputGroup> */}
        </ListItem>
        <ListItem onPress={() => this.onPress('interval')}>
          <Body>
            <Text>Sync. Threshold</Text>
          </Body>
          <Right>
            <Text>{syncThreshold}</Text>
            <Icon name="arrow-forward" />
          </Right>

          {/* <InputGroup>
            <Input
              inlineLabel
              keyboardType="numeric"
              label="Sync. Threshold"
              value={config.syncThreshold}
              onChangeText={val => this.onChangeNumber(val, 'syncThreshold')}
            />
          </InputGroup> */}
        </ListItem>
      </List>
    );
  }
}

export default ConfigScene;
