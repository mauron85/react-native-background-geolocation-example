import React, {Component} from 'react';
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

const activities = [
  { label: 'Automotive Navigation', value: 'AUTOMOTIVENAVIGATION' },
  { label: 'Other Navigation', value: 'OTHERNAVIGATION' },
  { label: 'Fitness', value: 'FITNESS' },
  { label: 'Other', value: 'OTHER' },
];

class ConfigScene extends CommonConfigScene {
    constructor(props) {
        super(props);
    }

    renderIosSection(config) {
      return (
        <List>
            <ListItem itemDivider>
                <ListItemDivider>iOS</ListItemDivider>
            </ListItem>
            <ListItem>
                <Picker
                  label="Activity Type"
                  iosHeader="Select one"
                  mode="dropdown"
                  items={activities}
                  selectedItem={String(config.activityType || 'AutomotiveNavigation').toUpperCase()}
                  onItemChange={val => this.onChange(val, 'activityType')}
                />
            </ListItem>
            <ListItem>
              <InputGroup>
                <Switch label="Save battery" value={config.saveBatteryOnBackground} onValueChange={val => this.onChange(val, 'saveBatteryOnBackground')} />
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
                      <Button transparent onPress={this.configure}>
                          Apply
                      </Button>
                </Header>
                <Content>
                  {(() => {
                    if (isReady) {
                      return (
                        <View>
                          {this.renderIosSection(config)}
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
