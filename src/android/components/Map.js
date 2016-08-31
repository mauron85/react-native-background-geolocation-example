'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3'
  },
  button: {
    width: 40,
    height: 40,
  }
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      isTracking: false
    };
  }

  componentWillMount() {
    function logError (msg) {
      console.log(`[ERROR] getLocations: ${msg}`);
    }

    function handleHistoricLocations (locations) {
      let region = {};
      const now = Date.now();
      const longitudeDelta = 0.01;
      const latitudeDelta = 0.01;
      const sameDayDiffInMillis = 24 * 3600 * 1000;
      const historicLocations = this.state.locations.slice(0);

      locations.forEach((location, idx) => {
        if ((now - location.time) <= sameDayDiffInMillis) {
          region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
          historicLocations.push(Object.assign({}, location, { key: idx }));
        }
      });
      if (historicLocations.length > 0) {
        this.setState({ locations: historicLocations, region });        
      }
    }

    BackgroundGeolocation.getLocations(handleHistoricLocations.bind(this), logError);
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      debug: true,
      locationProvider: BackgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER,
      interval: 30000,
      fastestInterval: 5000,
      stopOnStillActivity: false,
      stopOnTerminate: false,
      url: 'http://192.168.81.15:3000/locations',
      syncThreshold: 50,
      maxLocations: 100,
      httpHeaders: {
        'X-FOO': 'bar'
      }
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      const longitudeDelta = 0.01;
      const latitudeDelta = 0.01;
      const region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
      const locations = this.state.locations.slice(0);
      locations.push(Object.assign({}, location, { key: locations.length }));
      this.setState({ locations, region });
    });
    
    BackgroundGeolocation.getConfig(
      function(config) {console.log('[DEBUG] getConfig', config);}
    );
  }

  toggleTracking() {
    if (this.state.isTracking) {
      this.stopTracking();
    } else {
      this.startTracking();
    }
  }

  startTracking() {
    if (this.state.isTracking) { return; }

    BackgroundGeolocation.isLocationEnabled((enabled) => {
      if (enabled) {
        BackgroundGeolocation.start(
          () => {
            // service started successfully
            // you should adjust your app UI for example change switch element to indicate
            // that service is running
            console.log('[DEBUG] BackgroundGeolocation started successfully');
            this.setState({ isTracking: true });
          },
          (error) => {
            // Tracking has not started because of error
            // you should adjust your app UI for example change switch element to indicate
            // that service is not running
            if (error.code === 2) {
              BackgroundGeolocation.showAppSettings();
            } else {
              console.log('[ERROR] Start failed: ' + error.message);  
            }
            this.setState({ isTracking: false });
          }
        );
      } else {
        // Location services are disabled
        BackgroundGeolocation.showLocationSettings();
      }
    });
  }

  stopTracking() {
    if (!this.state.isTracking) { return; }

    BackgroundGeolocation.stop();
    this.setState({ isTracking: false });
  }

  render() {
    var { height, width } = Dimensions.get('window');
    var Button = this.state.isTracking
      ? <Image style={styles.button} source={require('./stop.png')} />
      : <Image style={styles.button} source={require('./start.png')} />

    return (
      <View style={styles.container}>
        <MapView
          style={{ height: height - styles.bar.height, width, flex: 1 }}
          region={this.state.region}
        >
        {this.state.locations.map(location => (
          <MapView.Marker
            key={location.key}
            coordinate={location}
            image={require('./TrackingDot.png')}
          />
        ))}
        </MapView>
        <View style={styles.bar}>
          <TouchableOpacity onPress={this.toggleTracking.bind(this)}>
            {Button}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export default Map;
