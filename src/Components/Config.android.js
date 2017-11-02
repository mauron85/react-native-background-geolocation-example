import React, { Component } from 'react';
import { InteractionManager, View, Text } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Right,
  Footer,
  FooterTab,
  Button,
  Icon,
  Input,
  Switch,
  List,
  ListItem
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import CommonConfig from './Config.common';

const providers = [
  {
    label: 'Distance Filter',
    value: String(
      BackgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER
    )
  },
  {
    label: 'Activity',
    value: String(BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER)
  }
];

class ConfigScene extends Component {
  static defaultProps = {
    interval: 0,
    fastestInterval: 0,
    activitiesInterval: 0,
    locationProvider: 0,
    startOnBoot: false,
    notificationTitle: '',
    notificationText: '',
    notificationIconColor: ''
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
      interval,
      fastestInterval,
      activitiesInterval,
      locationProvider,
      startOnBoot,
      notificationTitle,
      notificationText,
      notificationIconColor
    } = this.props;
    return (
      <View>
        <CommonConfig {...this.props} />
        <List>
          <ListItem itemDivider>
            <Text>Android</Text>
          </ListItem>
          <ListItem onPress={() => this.onPress('interval')}>
            <Body>
              <Text>Interval</Text>
            </Body>
            <Right>
              <Text>{interval}</Text>
              <Icon name="arrow-forward" />
              {/* <Input
              keyboardType="numeric"
              value={interval}
              onChangeText={val => this.onChangeNumber(val, 'interval')}
            /> */}
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('fastestInterval')}>
            <Body>
              <Text>Fast. Interval</Text>
            </Body>
            <Right>
              <Text>{fastestInterval}</Text>
              <Icon name="arrow-forward" />

              {/* <Input
              keyboardType="numeric"
              value={fastestInterval}
              onChangeText={val => this.onChangeNumber(val, 'fastestInterval')}
            /> */}
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('activitiesInterval')}>
            <Body>
              <Text>Activ. Interval</Text>
            </Body>
            <Right>
              <Text>{activitiesInterval}</Text>
              <Icon name="arrow-forward" />
              {/* <Input
              keyboardType="numeric"
              value={activitiesInterval}
              onChangeText={val =>
                this.onChangeNumber(val, 'activitiesInterval')}
            /> */}
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('locationProvider')}>
            <Body>
              <Text>Location Provider</Text>
            </Body>
            <Right>           
              <Text>{locationProvider}</Text>
              <Icon name="arrow-forward" />
              {/* <Picker
              label="Location Provider"
              iosHeader="Select one"
              mode="dropdown"
              items={providers}
              selectedItem={String(locationProvider || 0)}
              onItemChange={val => this.onChangeNumber(val, 'locationProvider')}
            /> */}
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Start On Boot</Text>
            </Body>
            <Right>
              <Switch
                value={startOnBoot}
                onValueChange={val => this.onChange(val, 'startOnBoot')}
              />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>Notification</Text>
          </ListItem>
          <ListItem onPress={() => this.onPress('notificationTitle')}>
            <Body>
              <Text>Title</Text>
            </Body>
            <Right>
              <Text>{notificationTitle}</Text>
              <Icon name="arrow-forward" />

              {/* <Input
              value={notificationTitle}
              onChangeText={val => this.onChange(val, 'notificationTitle')}
            /> */}
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('notificationText')}>
            <Body>
              <Text>Text</Text>
            </Body>
            <Right>
              <Text>{notificationText}</Text>
              <Icon name="arrow-forward" />

              {/* <Input
              value={notificationText}
              onChangeText={val => this.onChange(val, 'notificationText')}
            /> */}
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('notificationIconColor')}>
            <Body>
              <Text>Color</Text>
            </Body>
            <Right>
              <Text>{notificationIconColor}</Text>
              <Icon name="arrow-forward" />

              {/* <Input
              value={notificationIconColor}
              onChangeText={val => this.onChange(val, 'notificationIconColor')}
            /> */}
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default ConfigScene;
