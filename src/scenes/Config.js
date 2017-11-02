import React, { Component } from 'react';
import { InteractionManager, View, Text } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  List,
  ListItem,
  Spinner
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Config from '../Components/Config';

class ConfigScene extends Component {
  static navigationOptions = {
    title: 'Configuration'
  };

  constructor(props) {
    super(props);
    this.state = {
      config: null,
      error: null,
      isReady: false
    };
    this.getConfig = this.getConfig.bind(this);
    this.configure = this.configure.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getConfig();
    });
  }

  getConfig() {
    const successFn = config => {
      console.log(config);
      this.setState({ config, error: null, isReady: true });
    };
    const errorFn = error => {
      console.log('[ERROR] Configuration error', error);
      this.setState({ config: null, error, isReady: true });
    };
    BackgroundGeolocation.getConfig(successFn, errorFn);
  }

  configure() {
    this.setState({ isReady: false });
    BackgroundGeolocation.configure(
      this.state.config,
      this.getConfig,
      this.getConfig
    );
  }

  onEdit(key) {
    const config = this.state.config || {};
    this.props.navigation.navigate('EditConfig', { key, value: config[key], config });
  }

  onChange(value, key) {
    const config = Object.assign({}, this.state.config);
    config[key] = value;
    this.setState({ config });
  }

  onChangeNumber(value, key) {
    const config = Object.assign({}, this.state.config);
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      config[key] = numeric;
    }
    this.setState({ config });
  }

  render() {
    const { config, error, isReady } = this.state;
    return (
      <Container>
        <Content>
          {(() => {
            if (!isReady) {
              return <Spinner />;
            }
            return (
              <View>
                <Config
                  {...config}
                  onEdit={this.onEdit}
                  onChange={this.onChange}
                  onChangeNumber={this.onChangeNumber}
                />
              </View>
            );
          })()}
        </Content>
        <Footer>
          <FooterTab>
            <Button large onPress={this.configure}>
              <Text>Apply</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default ConfigScene;
