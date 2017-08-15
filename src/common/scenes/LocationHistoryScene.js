import React, {Component} from 'react';
import { StyleSheet, InteractionManager, Alert, View } from 'react-native';
import {Container, Header, Content, Footer, FooterTab, Title, List, ListItem, Text, Button, Icon} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import {Preloader} from '../Components';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  location: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
  },
  row: {
    flex: 1
  },
  icon: {
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#0A69FE'
  },
});

const LogItem = ({ selected, locationId, latitude, longitude, time, onPress }) => {
  const date = new Date(time);
  return (
    <ListItem onPress={() => onPress(locationId)}>
      <View style={styles.item}>
        <View style={styles.icon}>
          <Text>{`${locationId}`}</Text>
        </View>
        <View style={styles.location}>
          <View style={styles.row}>
            <Text note>{`lat: ${latitude}`}</Text>
          </View>
          <View style={styles.row}>
            <Text note>{`lon: ${longitude}`}</Text>
          </View>
          <View style={styles.row}>
            <Text>{`time: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Text>
          </View>
        </View>
        <View style={styles.icon}>
          <Icon
            style={styles.iconStyle}
            name={selected ? 'ios-radio-button-on' : 'ios-radio-button-off'}
          />
        </View>
      </View>
    </ListItem>
  );
}

class LocationHistoryScene extends Component {
    constructor(props) {
        super(props);
        this.state = { locations: null, selectedLocationId: -1 };
        this.onLocationSelected = this.onLocationSelected.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.refresh();
      });
    }

    refresh() {
      this.setState({ selectedLocationId: -1 });
      BackgroundGeolocation.getValidLocations(locations => {
          this.setState({ locations });
      });
    }

    onLocationSelected(locationId) {
        const selectedLocationId = (locationId !== this.state.selectedLocationId) ? locationId : -1;
        this.setState({ selectedLocationId });
    }

    onDelete() {
      const { selectedLocationId } = this.state;
      if (selectedLocationId > -1) {
        BackgroundGeolocation.deleteLocation(selectedLocationId, this.refresh);
      } else {
        Alert.alert('Confirm action', 'Do you really want to delete all location?', [
          { text: 'Yes', onPress: () => BackgroundGeolocation.deleteAllLocations(this.refresh) },
          { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
        ]);
      }
    }

    renderContent(locations, selectedLocationId) {
      return (
        <List dataArray={locations}
            renderRow={(loc) => {
              const date = new Date(loc.time);
              const selected = selectedLocationId === loc.locationId;
              return (
                <LogItem key={loc.locationId} {...loc} selected={selected} onPress={this.onLocationSelected}/>
              );
            }}>
        </List>
      );
    }

    render() {
        const { selectedLocationId, locations } = this.state;
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this.props.onBack}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                    <Title>Pending Locations</Title>
                </Header>
                <Content>
                  {(() => {
                    if (locations) return this.renderContent(locations, selectedLocationId);
                    return <Preloader/>;
                  })()}
                </Content>
                <Footer>
                  <FooterTab>
                  <Button onPress={this.onDelete}>
                      {selectedLocationId > -1 ? 'Delete location' : 'Delete all'}
                  </Button>
                  </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default LocationHistoryScene;
