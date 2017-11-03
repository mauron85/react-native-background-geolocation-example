import React, { PureComponent } from 'react';
import { InteractionManager, View, Text } from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Button,
  Spinner,
  Icon
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Config from '../Components/Config';
import Modal from './EditConfigModal';

class ConfigScene extends PureComponent {
  static navigationOptions = {
    title: 'Configuration',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      config: null,
      error: null,
      isReady: false,
      isEditing: false,
      editConfigProp: null
    };
    this.getConfig = this.getConfig.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditDone = this.onEditDone.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onApplyChange = this.onApplyChange.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getConfig();
    });
  }

  getConfig() {
    const successFn = config => {
      this.setState({ config, error: null, isReady: true });
    };
    const errorFn = error => {
      this.setState({ config: null, error, isReady: true });
    };
    BackgroundGeolocation.getConfig(successFn, errorFn);
  }

  onEdit(key) {
    this.setState({ isEditing: true, editConfigProp: key });
  }

  onEditDone() {
    const config = this.state.config;
    BackgroundGeolocation.configure(config, this.getConfig, this.getConfig);
    this.setState({ isEditing: false, editConfigProp: null });
  }

  onChange(key, value) {
    console.log(key, value);
    const config = { ...this.state.config };
    config[key] = value;
    this.setState({ config });
  }

  onApplyChange(key, value) {
    const config = { ...this.state.config };
    config[key] = value;
    BackgroundGeolocation.configure(config, this.getConfig, this.getConfig);
    this.setState({ config });
  }

  render() {
    const { config, error, isReady, isEditing, editConfigProp } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Configuration</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {(() => {
            if (!isReady) {
              return <Spinner />;
            }
            return (
              <Config
                {...config}
                onEdit={this.onEdit}
                onChange={this.onApplyChange}
              />
            );
          })()}
          <Modal
            visible={isEditing}
            configProp={editConfigProp}
            configValue={config && config[editConfigProp]}
            onClose={this.onEditDone}
            onChange={this.onChange}
          />
        </Content>
      </Container>
    );
  }
}

export default ConfigScene;
