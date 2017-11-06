import React, { PureComponent } from 'react';
import { Modal, Slider as NativeSlider, View } from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Form,
  Item,
  Button,
  Icon,
  Picker,
  Text,
  Input
} from 'native-base';
import { providers } from '../Components/Config.common';
import { activities } from '../Components/Config.ios';
import { i18n } from '../i18n';

const styles = {
  content: {
    padding: 10,
    backgroundColor: '#fff'
  }
};

const configPropTypes = {
  desiredAccuracy: {
    type: 'number',
    units: 'meters',
    step: 5,
    minimumValue: 0,
    maximumValue: 100,
    multiplier: 1
  },
  stationaryRadius: {
    type: 'number',
    units: 'meters',
    step: 1,
    minimumValue: 0,
    maximumValue: 250,
    multiplier: 1
  },
  distanceFilter: {
    type: 'number',
    units: 'meters',
    step: 1,
    minimumValue: 0,
    maximumValue: 1000,
    multiplier: 1
  },
  maxLocations: {
    type: 'number',
    step: 1,
    minimumValue: 0,
    maximumValue: 10000,
    multiplier: 1
  },
  url: 'string',
  syncUrl: 'string',
  syncThreshold: {
    type: 'number',
    step: 1,
    minimumValue: 0,
    maximumValue: 10000,
    multiplier: 1
  },
  // Android
  interval: {
    type: 'number',
    units: 'seconds',
    step: 1,
    minimumValue: 0,
    maximumValue: 300,
    multiplier: 1000
  },
  fastestInterval: {
    type: 'number',
    units: 'seconds',
    step: 1,
    minimumValue: 0,
    maximumValue: 300,
    multiplier: 1000
  },
  activitiesInterval: {
    type: 'number',
    units: 'seconds',
    step: 1,
    minimumValue: 0,
    maximumValue: 300,
    multiplier: 1000
  },
  locationProvider: {
    type: 'enum',
    items: providers,
    formatter: (val) => Number(val)
  },
  notificationTitle: 'string',
  notificationText: 'string',
  notificationIconColor: 'string',
  // iOS
  activityType: {
    type: 'enum',
    items: activities
  }
};

class Slider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentWillReceiveProps(props) {
    if (!this.state.value) {
      this.setState({ value: props.value });
    }
  }

  render() {
    return (
      <NativeSlider
        {...this.props}
        value={this.state.value}
      />
    );
  }
}

export default class ModalExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: props.configValue };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({ value: this.props.configValue });
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.configValue });
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    const { visible, configProp, configValue, onClose } = this.props;
    const { value } = this.state;

    return (
      <Modal
        transparent={false}
        animationType="slide"
        visible={visible}
        onRequestClose={() => {}}
      >
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={() => onClose()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Edit value</Title>
            </Body>
            <Right />
          </Header>
          <Content style={styles.content}>
            <Text>{i18n[configProp]}</Text>
            {(() => {
              const configPropType = configPropTypes[configProp] || {};
              const type = configPropType.type || configPropType;
              switch (type) {
                case 'number':
                  const { multiplier, units = '' } = configPropType;
                  return (
                    <View>
                      <Text>
                        {value / multiplier} {units}
                      </Text>
                      <Slider
                        {...configPropType}
                        value={configProp !== null && configValue / multiplier}
                        onSlidingComplete={val =>
                          this.props.onChange(configProp, val * multiplier)}
                        onValueChange={val => this.onChange(val * multiplier)}
                      />
                    </View>
                  );
                case 'enum':
                  const formatter = configPropType.formatter;
                  return (
                    <Picker
                      mode="dropdown"
                      placeholder="Select One"
                      selectedValue={String(configValue)}
                      onValueChange={val =>
                        this.props.onChange(configProp, formatter ? formatter(val) : val)}
                    >
                      {configPropType.items.map(({ label, value }) => (
                        <Picker.Item key={value} label={label} value={String(value)} />
                      ))}
                    </Picker>
                  );
                default:
                  return (
                    <Item>
                    <Input
                      value={String(configValue || '')}
                      onChangeText={val => this.props.onChange(configProp, val)}
                    />
                    </Item>
                  );
              }
            })()}
          </Content>
        </Container>
      </Modal>
    );
  }
}
