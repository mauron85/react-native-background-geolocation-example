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

export const activities = [
  {
    label: 'Automotive',
    value: 'AutomotiveNavigation',
  },
  {
    label: 'Fitness',
    value: 'Fitness',
  },
  {
    label: 'Other',
    value: 'OtherNavigation',
  }
];

class Config extends Component {
  static defaultProps = {
    activityType: 0,
    pauseLocationUpdates: false,
    saveBatteryOnBackground: false
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
      activityType,
      pauseLocationUpdates,
      saveBatteryOnBackground
    } = this.props;

    const activity = activities.find(activity => {
      activity.value === activityType;
    });
    
    return (
      <View>
        <CommonConfig {...this.props} />
        <List style={{ flex: 1, backgroundColor: '#fff' }}>
          <ListItem itemDivider>
            <Text>iOS</Text>
          </ListItem>
          <ListItem>
            <Body>
              <Text>{i18n.pauseLocationUpdates}</Text>
            </Body>
            <Right>
              <Switch
                value={pauseLocationUpdates}
                onValueChange={val => this.onChange(val, 'pauseLocationUpdates')}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>{i18n.saveBatteryOnBackground}</Text>
            </Body>
            <Right>
              <Switch
                value={saveBatteryOnBackground}
                onValueChange={val => this.onChange(val, 'saveBatteryOnBackground')}
              />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.onPress('activityType')}>
            <Body>
              <Text>{i18n.activityType}</Text>
              <Text note>{activity}</Text>
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

export default Config;
