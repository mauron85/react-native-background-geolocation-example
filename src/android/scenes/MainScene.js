'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      isRunning: false
    };
    this.goToSettings = this.goToSettings.bind(this);
    this.toggleTracking = this.toggleTracking.bind(this);
  }

  componentDidMount() {
    console.log('map did mount');

    function logError (msg) {
      console.log(`[ERROR] getLocations: ${msg}`);
    }

    const handleHistoricLocations = (locations) => {
      let region = null;
      const now = Date.now();
      const latitudeDelta = 0.01;
      const longitudeDelta = 0.01;
      const durationOfDayInMillis = 24 * 3600 * 1000;

      const locationsPast24Hours = locations.filter(location => {
        return (now - location.time) <= durationOfDayInMillis;
      });

      if (locationsPast24Hours.length > 0) {
        // asume locations are already sorted
        const lastLocation = locationsPast24Hours[locationsPast24Hours.length - 1];
        region = Object.assign({}, lastLocation, { latitudeDelta, longitudeDelta });
      }
      this.setState({ locations: locationsPast24Hours, region });
    };

    BackgroundGeolocation.getValidLocations(handleHistoricLocations.bind(this), logError);

    BackgroundGeolocation.on('start', () => {
      // service started successfully
      // you should adjust your app UI for example change switch element to indicate
      // that service is running
      console.log('[DEBUG] BackgroundGeolocation has been started');
      this.setState({ isRunning: true });
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[DEBUG] BackgroundGeolocation has been stopped');
      this.setState({ isRunning: false });
    });

    BackgroundGeolocation.on('mode_change', (enabled) => {
      console.log('[INFO] BackgroundGeolocation location is enabled: ' + enabled);
      if (enabled) return;
      Alert.alert('Location is disabled', 'Would you like to open location settings?', [
        { text: 'Yes', onPress: () => BackgroundGeolocation.showLocationSettings() },
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
      ]);
    });

    BackgroundGeolocation.on('permissions_denied', () => {
      console.log('[INFO] BackgroundGeolocation needs permissions');
      Alert.alert('Not authorized for location updates', 'Would you like to open app settings?', [
        { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
      ]);
    });

    BackgroundGeolocation.on('error', ({ message }) => {
      Alert.alert('BackgroundGeolocation error', message);
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      const longitudeDelta = 0.01;
      const latitudeDelta = 0.01;
      const region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
      const locations = this.state.locations.slice(0);
      locations.push(location);
      this.setState({ locations, region });
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      this.setState({ isRunning });
    });
  }

  componentWillUnmount() {
    BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
  }

  goToSettings(visible) {
    this.props.navigator.replace({ name: 'Menu' });
  }

  toggleTracking() {
    BackgroundGeolocation.checkStatus(({ isRunning, locationModeOn }) => {
      if (isRunning) {
        BackgroundGeolocation.stop();
        return false;
      }
      if (locationModeOn) {
        // calling start will also ask user for permission if needed
        // permission error will be handled in permisision_denied event
        BackgroundGeolocation.start();
      } else {
        // Location services are disabled
        Alert.alert('Location services disabled', 'Would you like to open location settings?', [
          { text: 'Yes', onPress: () => BackgroundGeolocation.showLocationSettings() },
          { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
        ]);
      }
    });
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { locations, region, isRunning } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <MapView
            style={{ width, flex: 1 }}
            region={region}
          >
          {locations.map((location, idx) => (
            <MapView.Marker
              key={idx}
              coordinate={location}
              image={require('../../res/TrackingDot.png')}
            />
          ))}
          </MapView>
        </View>
        <Footer>
            <FooterTab>
                <Button transparent onPress={this.toggleTracking}>
                    <Icon name={isRunning ? 'ios-pause' : 'ios-play'} />
                </Button>
                <Button transparent onPress={this.goToSettings}>
                    <Icon name="ios-menu" />
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}


export default Map;
