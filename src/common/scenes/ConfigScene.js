import React, {PropTypes, Component} from 'react';
import {InteractionManager,View,Text} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import {Preloader, Picker, InputGroup, Input, Switch, ListItemDivider} from '../../common/Components';

class ConfigScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: null,
            isReady: false,
        };
        this.configure = this.configure.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
          this.getConfig();
        });
    }

    getConfig() {
      BackgroundGeolocation.getConfig(config => {
          console.log(config);
          this.setState({ config, isReady: true });
      });
    }

    configure() {
      const successFn = () => {
        this.getConfig();
      };
      const errorFn = () => {
        this.getConfig();
      };
      this.setState({ isReady: false });
      BackgroundGeolocation.configure(this.state.config, successFn, errorFn);
    }

    onChange(value, key) {
        const config = Object.assign({}, this.state.config);
        config[key] = value;
        this.setState({config});
    }

    onChangeNumber(value, key) {
      const config = Object.assign({}, this.state.config);
      const numeric = Number(value);
      if (!Number.isNaN(numeric)) {
        config[key] = numeric;
      }
      this.setState({config});
    }

    renderCommon(config) {
      return (
        <List>
            <ListItem itemDivider>
                <ListItemDivider>General</ListItemDivider>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel keyboardType="numeric" label="Desired Accuracy" value={config.desiredAccuracy} onChangeText={val => this.onChangeNumber(val, 'desiredAccuracy')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Stationary Radius" value={config.stationaryRadius} onChangeText={val => this.onChangeNumber(val, 'stationaryRadius')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Distance Filter" value={config.distanceFilter} onChangeText={val => this.onChangeNumber(val, 'distanceFilter')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Switch label="Debug" value={config.debug} onValueChange={val => this.onChange(val, 'debug')} />
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Switch label="Start Foreground" value={config.startForeground} onValueChange={val => this.onChange(val, 'startForeground')} />
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                  <Switch label="Stop On Still" value={config.stopOnStillActivity} onValueChange={val => this.onChange(val, 'stopOnStillActivity')} />
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                  <Switch label="Stop On Terminate" value={config.stopOnTerminate} onValueChange={val => this.onChange(val, 'stopOnTerminate')} />
                </InputGroup>
            </ListItem>
            <ListItem itemDivider>
                <ListItemDivider>Location sync</ListItemDivider>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel keyboardType="numeric" label="Max. Locations" value={config.maxLocations} onChangeText={val => this.onChangeNumber(val, 'maxLocations')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Post url." value={config.url || 'http://'} onChangeText={val => this.onChange(val, 'url')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Sync url." value={config.syncUrl || 'http://'} onChangeText={val => this.onChange(val, 'syncUrl')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel keyboardType="numeric" label="Sync. Threshold" value={config.syncThreshold} onChangeText={val => this.onChangeNumber(val, 'syncThreshold')}/>
                </InputGroup>
            </ListItem>
        </List>
      );
    }

    render() {
      return <Text>This is base scene and has to be overriden in child class!</Text>
    }
}

export default ConfigScene;
