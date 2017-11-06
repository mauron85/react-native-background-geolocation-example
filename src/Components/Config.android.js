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
import CommonConfig from './Config.common';
import { i18n } from '../i18n';

class ConfigScene extends Component {
  static defaultProps = {
    interval: 0,
    fastestInterval: 0,
    activitiesInterval: 0,
    startOnBoot: false,
    notificationTitle: '',
    notificationText: '',
    notificationIconColor: ''
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
        <List style={{ flex: 1, backgroundColor: '#fff' }}>
          <ListItem itemDivider>
            <Text>Android</Text>
          </ListItem>
          <ListItem onPress={() => this.onPress('interval')}>
            <Body>
              <Text>{i18n.interval}</Text>
              <Text note>{interval} [ms]</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('fastestInterval')}>
            <Body>
              <Text>{i18n.fastestInterval}</Text>
              <Text note>{fastestInterval} [ms]</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('activitiesInterval')}>
            <Body>
              <Text>{i18n.activitiesInterval}</Text>
              <Text note>{activitiesInterval} [ms]</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>{i18n.startOnBoot}</Text>
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
              <Text>{i18n.notificationTitle}</Text>
              <Text note>{notificationTitle}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('notificationText')}>
            <Body>
              <Text>{i18n.notificationText}</Text>
              <Text note>{notificationText}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('notificationIconColor')}>
            <Body>
              <Text>{i18n.notificationIconColor}</Text>
              <Text note>{notificationIconColor}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default ConfigScene;
