import React, {PropTypes, Component} from 'react';
import {StyleSheet,InteractionManager,View,Text,TextInput,Switch as SwitchRN} from 'react-native';
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
    // InputGroup,
    // Input,
    Picker,
    // Text
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import MainButton from '../Button';
import Preloader from '../Preloader';

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
    },
    inputGroup: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      width: 150,
    },
    labelText: {
      fontSize: 15,
      color: '#000'
    },
    input: {
      flex: 1,
    },
    inputText: {
      fontSize: 15,
      textAlign: 'right',
    },
    iconStyle: {
      color: '#0A69FE',
      marginRight: 10
    }
});

// just for compatibility with native-base
const InputGroup = ({ children }) => {
  return children;
};

const Input = ({ label, ...inputProps }) => {
  return (
    <View style={styles.inputGroup}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.input}>
        <TextInput underlineColorAndroid="transparent" style={styles.inputText} {...inputProps}/>
      </View>
    </View>
  );
}

const Switch = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.inputGroup}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.input}>
        <SwitchRN
          value={value}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

const defaultProviders = [
  { label: 'Distance Filter', value: String(BackgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER) },
  { label: 'Activity', value: String(BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER) },
];

const ProviderPicker = ({ label, selectedProvider, providers = defaultProviders, onProviderChange, ...pickerProps }) => {
  const Items = providers.map(provider => <Picker.Item key={provider.value} label={provider.label} value={provider.value} />);
  return (
    <View style={styles.inputGroup}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.input}>
        <Picker
          {...pickerProps}
          selectedValue={String(selectedProvider)}
          onValueChange={val => onProviderChange(val)}>
            {Items}
        </Picker>
      </View>
    </View>
  );
}

class ConfigScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: null,
        };
        this.configure = this.configure.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
          BackgroundGeolocation.getConfig(config => {
              this.setState({config});
          });
        });
    }

    configure() {
      // BackgroundGeolocation.stop();
      BackgroundGeolocation.configure(this.state.config);
      // BackgroundGeolocation.stop();
    }

    onChange(value, key) {
        const config = Object.assign({}, this.state.config);
        config[key] = value;
        this.setState({config});
    }

    renderContent(config) {
      return (
        <List>
            <ListItem itemDivider>
                <Text style={styles.labelText}>General</Text>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel keyboardType="numeric" label="Desired Accuracy" value={String(config.desiredAccuracy)} onChangeText={val => this.onChange(Number(val), 'desiredAccuracy')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Stationary Radius" value={String(config.stationaryRadius)} onChangeText={val => this.onChange(Number(val), 'stationaryRadius')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Distance Filter" value={String(config.distanceFilter)} onChangeText={val => this.onChange(Number(val), 'distanceFilter')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Interval" value={String(config.interval)} onChangeText={val => this.onChange(Number(val), 'interval')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Fast. Interval" value={String(config.fastestInterval)} onChangeText={val => this.onChange(Number(val), 'fastestInterval')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Activ. Interval" value={String(config.activitiesInterval)} onChangeText={val => this.onChange(Number(val), 'activitiesInterval')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Switch label="Debug" value={Boolean(config.debug)} onValueChange={val => this.onChange(Boolean(val), 'debug')} />
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Switch label="Start Foreground" value={Boolean(config.startForeground)} onValueChange={val => this.onChange(Boolean(val), 'startForeground')} />
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                  <Switch label="Stop On Still" value={Boolean(config.stopOnStillActivity)} onValueChange={val => this.onChange(Boolean(val), 'stopOnStillActivity')} />
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                  <Switch label="Stop On Terminate" value={Boolean(config.stopOnTerminate)} onValueChange={val => this.onChange(Boolean(val), 'stopOnTerminate')} />
                </InputGroup>
            </ListItem>
            <ListItem itemDivider>
                <Text style={styles.labelText}>Android</Text>
            </ListItem>
            <ListItem>
                <ProviderPicker
                  label="Location Provider"
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedProvider={config.locationProvider}
                  onProviderChange={val => this.onChange(Number(val), 'locationProvider')}
                />
            </ListItem>
            <ListItem>
              <InputGroup>
                <Switch label="Start On Boot" value={Boolean(config.startOnBoot)} onValueChange={val => this.onChange(Boolean(val), 'startOnBoot')} />
              </InputGroup>
            </ListItem>
            <ListItem itemDivider>
                <Text style={styles.labelText}>iOS</Text>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Activity Type" value={String(config.activityType)} onChangeText={val => this.onChange(String(val), 'activityType')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Switch label="Save battery" value={Boolean(config.saveBatteryOnBackground)} onValueChange={val => this.onChange(Boolean(val), 'saveBatteryOnBackground')} />
              </InputGroup>
            </ListItem>
            <ListItem itemDivider>
                <Text style={styles.labelText}>Notification</Text>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Title" value={String(config.notificationTitle)} onChangeText={val => this.onChange(String(val), 'notificationTitle')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Text" value={String(config.notificationText)} onChangeText={val => this.onChange(String(val), 'notificationText')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Color" value={String(config.notificationIconColor)} onChangeText={val => this.onChange(String(val), 'notificationIconColor')}/>
                </InputGroup>
            </ListItem>
            <ListItem itemDivider>
                <Text style={styles.labelText}>Location sync</Text>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Max. Locations" value={String(config.maxLocations)} onChangeText={val => this.onChange(Number(val), 'maxLocations')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Post url." value={String(config.url || 'http://')} onChangeText={val => this.onChange(String(val), 'url')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Sync url." value={String(config.syncUrl || 'http://')} onChangeText={val => this.onChange(String(val), 'syncUrl')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Sync. Threshold" value={String(config.syncThreshold)} onChangeText={val => this.onChange(Number(val), 'syncThreshold')}/>
                </InputGroup>
            </ListItem>
        </List>
      );
    }

    render() {
        const {config} = this.state;
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this.props.onBack}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                    <Title>Configuration</Title>
                </Header>
                <Content>
                  {(() => {
                    if (config) return this.renderContent(config);
                    return <Preloader/>;
                  })()}
                </Content>
                <Footer>
                  <MainButton onPress={this.configure}>
                      Set
                  </MainButton>
                </Footer>
            </Container>
        );
    }
}

export default ConfigScene;
