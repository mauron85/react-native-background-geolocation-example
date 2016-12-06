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
import CommonConfigScene from '../../common/scenes/ConfigScene';
import {Preloader, Picker, InputGroup, Switch, ListItemDivider} from '../../common/Components';

const providers = [
  { label: 'Distance Filter', value: String(BackgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER) },
  { label: 'Activity', value: String(BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER) },
];

class ConfigScene extends CommonConfigScene {
    constructor(props) {
        super(props);
    }

    renderAndroid(config) {
      return (
        <List>
            <ListItem itemDivider>
                <ListItemDivider>Android</ListItemDivider>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Interval" value={config.interval} onChangeText={val => this.onChangeNumber(val, 'interval')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Fast. Interval" value={config.fastestInterval} onChangeText={val => this.onChangeNumber(val, 'fastestInterval')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input keyboardType="numeric" inlineLabel label="Activ. Interval" value={config.activitiesInterval} onChangeText={val => this.onChangeNumber(val, 'activitiesInterval')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <Picker
                  label="Location Provider"
                  iosHeader="Select one"
                  mode="dropdown"
                  items={providers}
                  selectedItem={String(config.locationProvider || 0)}
                  onItemChange={val => this.onChangeNumber(val, 'locationProvider')}
                />
            </ListItem>
            <ListItem>
              <InputGroup>
                <Switch label="Start On Boot" value={config.startOnBoot} onValueChange={val => this.onChange(val, 'startOnBoot')} />
              </InputGroup>
            </ListItem>
            <ListItem itemDivider>
                <Text style={styles.labelText}>Notification</Text>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Title" value={config.notificationTitle} onChangeText={val => this.onChange(val, 'notificationTitle')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Text" value={config.notificationText} onChangeText={val => this.onChange(val, 'notificationText')}/>
                </InputGroup>
            </ListItem>
            <ListItem>
                <InputGroup>
                    <Input inlineLabel label="Color" value={config.notificationIconColor} onChangeText={val => this.onChange(val, 'notificationIconColor')}/>
                </InputGroup>
            </ListItem>
        </List>
      );
    }

    render() {
        const {config, isReady} = this.state;
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
                    if (isReady) {
                      return (
                        <View>
                          {this.renderAndroid(config)}
                          {this.renderCommon(config)}
                        </View>
                      )
                    }
                    return <Preloader/>;
                  })()}
                </Content>
            </Container>
        );
    }
}

export default ConfigScene;
