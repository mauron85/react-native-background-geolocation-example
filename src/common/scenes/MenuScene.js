import React, {PropTypes, Component} from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text
} from 'native-base';

const styles = StyleSheet.create({
  iconStyle: {
    width: 30,
    marginRight: 10,
    color: '#0A69FE',
  },
});

class SettingsScene extends Component {
    navigate(scene){
      this.props.navigator.push({ name: scene });
    }

    render() {
        return (
          <Container>
              <Header>
                  <Button transparent onPress={this.props.onBack}>
                      <Icon name='ios-arrow-back'/>
                  </Button>
                  <Title>Menu</Title>
              </Header>
              <Content>
                  <List>
                      <ListItem onPress={() => this.navigate('Logs')}>
                          <Icon name="ios-archive" style={styles.iconStyle} />
                          <Text>Plugin Logs</Text>
                      </ListItem>
                      <ListItem onPress={() => this.navigate('LocationHistory')}>
                          <Icon name="ios-plane" style={styles.iconStyle} />
                          <Text>Pending Locations</Text>
                      </ListItem>
                      <ListItem onPress={() => this.navigate('Config')}>
                          <Icon name="ios-settings" style={styles.iconStyle} />
                          <Text>Plugin Configuration</Text>
                      </ListItem>
                  </List>
              </Content>
          </Container>
        );
    }
}

export default SettingsScene;
