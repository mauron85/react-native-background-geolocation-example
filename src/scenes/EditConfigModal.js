import React, { Component } from 'react';
import { Modal, Slider, View } from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Form,
  Button,
  Icon,
  Picker,
  Text,
  Input,
} from 'native-base';
import { providers } from '../Components/Config.android';
import { i18n } from '../i18n';

const styles = {
  form: {
    backgroundColor: '#ccc'
  }
};

const configPropTypes = {
  desiredAccuracy: {
    type: 'number',
    units: 'meters',
    step: 10,
    minimumValue: 0,
    maximumValue: 100,
    multiplier: 1
  },
  stationaryRadius: {
    type: 'number',
    units: 'meters',
    step: 1,
    minimumValue: 0,
    maximumValue: 10000,
    multiplier: 1
  },
  distanceFilter: {
    type: 'number',
    units: 'meters',
    step: 1,
    minimumValue: 0,
    maximumValue: 10000,
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
    items: providers
  },
  notificationTitle: 'string',
  notificationText: 'string',
  notificationIconColor: 'string'
};

export default class ModalExample extends Component {
  render() {
    const { visible, configProp, configValue, onClose } = this.props;

    return (
      <Modal
        transparent={false}
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
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
          <Content>
            <Text>{i18n[configProp]}</Text>
            {(() => {
              const configPropType = configPropTypes[configProp] || {};
              const type = configPropType.type || configPropType;
              console.log(configPropType.items);
              switch (type) {
                case 'number':
                  const { multiplier, units = '' } = configPropType;
                  return (
                    <View>
                      <Text>{configValue / multiplier} {units}</Text>
                      <Slider
                        {...configPropType}
                        value={configValue / multiplier}
                        onValueChange={val =>
                          this.props.onChange(configProp, val * multiplier)}
                      />
                    </View>
                  );
                case 'enum':
                  return (
                    <Picker
                      mode="dropdown"
                      placeholder="Select One"
                      selectedValue={String(configValue)}
                      onValueChange={val => this.props.onChange(configProp, Number(val))}
                    >
                      {configPropType.items.map(({ label, value }) => (
                        <Picker.Item key={value} label={label} value={value} />
                      ))}
                    </Picker>
                  );
                default:
                  return (
                    <Input
                      value={String(configValue || '')}
                      onChangeText={val => this.props.onChange(configProp, val)}
                    />
                  );
              }
            })()}
          </Content>
        </Container>
      </Modal>
    );
  }
}
