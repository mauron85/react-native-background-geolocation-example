import React, { PureComponent } from 'react';
import { StyleSheet, InteractionManager, Alert, View, FlatList } from 'react-native';
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
  id: locationId,
  selected,
  latitude,
  longitude,
  time,
  onPress
}) => {
  const date = new Date(time);
  return (
    <ListItem onPress={() => onPress(locationId)}>
      <Text>{`${locationId}`}</Text>
      <Body>
        <View>
        <Text>{`lat: ${latitude}`}</Text>
        <Text>{`lon: ${longitude}`}</Text>
        <Text>{`time: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Text>
        </View>
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

class PendingLocationsScene extends PureComponent {
  static navigationOptions = {
    title: 'Pending Locations',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { locations: null, selectedLocationId: -1, isReady: false };
    this.onLocationSelected = this.onLocationSelected.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.refresh = this.refresh.bind(this);
    this.forceSync = this.forceSync.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refresh();
    });
  }

  componentWillUnmount() {
    clearTimeout(this.syncTimeout);
  }

  refresh() {
    this.setState({ selectedLocationId: -1, isReady: false });
    BackgroundGeolocation.getValidLocations(locations => {
      this.setState({ locations, isReady: true });
    });
  }

  forceSync() {
    if (!this.syncTimeout) {
      BackgroundGeolocation.forceSync();
      this.syncTimeout = setTimeout(() => {
        this.refresh();
        this.syncTimeout = null;
      }, 5000);
    }
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

  _keyExtractor = (item, index) => item.id;

  render() {
    const { selectedLocationId, locations, isReady } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Pending Locations</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.refresh}>
              <Icon name="refresh" />
            </Button>
          </Right>
        </Header>
        <Content>
          {(() => {
            if (!isReady) {
              return <Spinner />;
            }
            return (
              <FlatList style={{ flex: 1, backgroundColor: '#fff' }}
                data={locations}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => {
                  const date = new Date(item.time);
                  const selected = selectedLocationId === item.id;
                  return (
                    <LogItem
                      {...item}
                      selected={selected}
                      onPress={this.onLocationSelected}
                    />
                  );
                }}
              />
            );
          })()}
        </Content>
        <Footer>
          <FooterTab>
            <Button danger onPress={this.onDelete}>
              <Text>
                {selectedLocationId > -1 ? 'Delete location' : 'Delete all'}
              </Text>
            </Button>
            <Button onPress={this.forceSync}>
              <Text>
                Force sync
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PendingLocationsScene;
