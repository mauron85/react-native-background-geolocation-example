'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base';
import MapView from 'react-native-maps';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import TrackingDot from '../res/TrackingDot.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    backgroundColor: '#0C68FB',
  },
  icon: {
    color: '#fff',
    fontSize: 30
  }
});

class MainScene extends PureComponent {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      stationaries: [],
      isRunning: false
    };

    this.goToSettings = this.goToSettings.bind(this);
  }

  componentDidMount() {
    console.log('map did mount');

    function logError(msg) {
      console.log(`[ERROR] getLocations: ${msg}`);
    }

    const handleHistoricLocations = locations => {
      let region = null;
      const now = Date.now();
      const latitudeDelta = 0.01;
      const longitudeDelta = 0.01;
      const durationOfDayInMillis = 24 * 3600 * 1000;

      const locationsPast24Hours = locations.filter(location => {
        return now - location.time <= durationOfDayInMillis;
      });

      if (locationsPast24Hours.length > 0) {
        // asume locations are already sorted
        const lastLocation =
          locationsPast24Hours[locationsPast24Hours.length - 1];
        region = Object.assign({}, lastLocation, {
          latitudeDelta,
          longitudeDelta
        });
      }
      this.setState({ locations: locationsPast24Hours, region });
    };

    BackgroundGeolocation.getValidLocations(
      handleHistoricLocations.bind(this),
      logError
    );

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

    BackgroundGeolocation.on('authorization', status => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== BackgroundGeolocation.auth.AUTHORIZED) {
        Alert.alert(
          'Location services are disabled',
          'Would you like to open location settings?',
          [
            {
              text: 'Yes',
              onPress: () => BackgroundGeolocation.showLocationSettings()
            },
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel'
            }
          ]
        );
      }
    });

    BackgroundGeolocation.on('error', ({ message }) => {
      Alert.alert('BackgroundGeolocation error', message);
    });

    BackgroundGeolocation.on('location', location => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      BackgroundGeolocation.startTask(taskKey => {
        requestAnimationFrame(() => {
          const longitudeDelta = 0.01;
          const latitudeDelta = 0.01;
          if (location.radius) {
            const region = Object.assign({}, location, {
              latitudeDelta,
              longitudeDelta
            });
            const stationaries = this.state.stationaries.slice(0);
            stationaries.push(location);
            this.setState({ stationaries, region });
          } else {
            const region = Object.assign({}, location, {
              latitudeDelta,
              longitudeDelta
            });
            const locations = this.state.locations.slice(0);
            locations.push(location);
            this.setState({ locations, region });
          }
          BackgroundGeolocation.endTask(taskKey);
        });
      });
    });

    // BackgroundGeolocation.on('stationary', (stationary) => {
    //   console.log('[DEBUG] BackgroundGeolocation stationary', stationary);
    //   BackgroundGeolocation.startTask(taskKey => {
    //     requestAnimationFrame(() => {
    //       const stationaries = this.state.stationaries.slice(0);
    //       stationaries.push(stationary);
    //       this.setState({ stationaries });
    //       BackgroundGeolocation.endTask(taskKey);
    //     });
    //   });
    // });

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
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  goToSettings() {
    this.props.navigation.navigate('Menu');
  }

  toggleTracking() {
    BackgroundGeolocation.checkStatus(({ isRunning, authorization }) => {
      if (isRunning) {
        BackgroundGeolocation.stop();
        return false;
      }
      if (authorization == BackgroundGeolocation.auth.AUTHORIZED) {
        // calling start will also ask user for permission if needed
        // permission error will be handled in permisision_denied event
        BackgroundGeolocation.start();
      } else {
        // Location services are disabled
        Alert.alert(
          'Location services disabled',
          'Would you like to open location settings?',
          [
            {
              text: 'Yes',
              onPress: () => BackgroundGeolocation.showLocationSettings()
            },
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel'
            }
          ]
        );
      }
    });
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { locations, stationaries, region, isRunning } = this.state;
    return (
      <Container>
        <Content>
          <MapView style={{ width, height }} region={region}>
            {locations.map((location, idx) => (
              <MapView.Marker
                key={idx}
                coordinate={location}
                image={TrackingDot}
              />
            ))}
            {stationaries.map((stationary, idx) => {
              return (
                <MapView.Circle
                  key={idx}
                  center={stationary}
                  radius={stationary.radius}
                  fillColor="#AAA"
                />
              );
            })}
          </MapView>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab>
            <Button onPress={this.toggleTracking}>
              <Icon name={isRunning ? 'pause' : 'play'} style={styles.icon} />
            </Button>
            <Button onPress={this.goToSettings}>
              <Icon name="menu" style={styles.icon} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default MainScene;
