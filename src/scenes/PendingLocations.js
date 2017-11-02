import React, { Component } from 'react';
import { StyleSheet, InteractionManager, Alert, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  Spinner
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const styles = StyleSheet.create({
  iconStyle: {
    color: '#0A69FE'
  }
});

const LogItem = ({
  selected,
  locationId,
  latitude,
  longitude,
  time,
  onPress
}) => {
  const date = new Date(time);
  return (
    <ListItem onPress={() => onPress(locationId)}>
      <Left>
        <Text>{`${locationId}`}</Text>
      </Left>
      <Body>
        <Text>{`lat: ${latitude}`}</Text>
        <Text>{`lon: ${longitude}`}</Text>
        <Text>{`time: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Text>
      </Body>
      <Right>
        <Icon
          style={styles.iconStyle}
          name={selected ? 'radio-button-on' : 'radio-button-off'}
        />
      </Right>
    </ListItem>
  );
};

class PendingLocationsScene extends Component {
  static navigationOptions = {
    title: 'Pending Locations'
  };

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
    const selectedLocationId =
      locationId !== this.state.selectedLocationId ? locationId : -1;
    this.setState({ selectedLocationId });
  }

  onDelete() {
    const { selectedLocationId } = this.state;
    if (selectedLocationId > -1) {
      BackgroundGeolocation.deleteLocation(selectedLocationId, this.refresh);
    } else {
      Alert.alert(
        'Confirm action',
        'Do you really want to delete all location?',
        [
          {
            text: 'Yes',
            onPress: () =>
              BackgroundGeolocation.deleteAllLocations(this.refresh)
          },
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel'
          }
        ]
      );
    }
  }

  renderContent(locations, selectedLocationId) {
    return (
      <List
        dataArray={locations}
        renderRow={loc => {
          const date = new Date(loc.time);
          const selected = selectedLocationId === loc.locationId;
          return (
            <LogItem
              key={loc.locationId}
              {...loc}
              selected={selected}
              onPress={this.onLocationSelected}
            />
          );
        }}
      />
    );
  }

  render() {
    const { selectedLocationId, locations } = this.state;
    return (
      <Container>
        <Content>
          {(() => {
            if (locations)
              return this.renderContent(locations, selectedLocationId);
            return <Spinner />;
          })()}
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.onDelete}>
              <Text>
                {selectedLocationId > -1 ? 'Delete location' : 'Delete all'}
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PendingLocationsScene;
