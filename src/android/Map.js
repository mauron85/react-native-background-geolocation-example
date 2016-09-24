'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Logs from '../common/Logs';
import logFormatter from '../utils/androidLogFormatter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#2196f3',
  },
  startButton: {
    flex: 1,
    alignSelf: 'center',
  },
  settingsButton: {
    width: 40,
    marginRight: 5,
    alignSelf: 'center',
  },
  buttonImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      isTracking: false,
      settingsVisible: false
    };
  }

  componentWillMount() {
    function logError (msg) {
      console.log(`[ERROR] getLocations: ${msg}`);
    }

    function handleHistoricLocations (locations) {
      let region = {};
      const now = Date.now();
      const latitudeDelta = 0.01;
      const longitudeDelta = 0.01;
      const sameDayDiffInMillis = 24 * 3600 * 1000;
      const currentLocations = this.state.locations.slice(0);
      let locationsCount = currentLocations.length;

      locations.forEach((location, idx) => {
        if ((now - location.time) <= sameDayDiffInMillis) {
          region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
          const histLocation = Object.assign({}, location, { key: locationsCount++ });
          console.log('[DEBUG] historic location', histLocation.key);
          currentLocations.push(histLocation);
        }
      });
      if (currentLocations.length > 0) {
        this.setState({ locations: currentLocations, region });
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
      const keyedLocation = Object.assign({}, location, { key: locations.length })
      console.log('[DEBUG] on location', keyedLocation.key);
      locations.push(keyedLocation);
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

  setSettingsVisible(visible) {
    this.setState({ settingsVisible: visible });
  }

  stopTracking() {
    if (!this.state.isTracking) { return; }

    BackgroundGeolocation.stop();
    this.setState({ isTracking: false });
  }

  render() {
    var { height, width } = Dimensions.get('window');
    var Button = this.state.isTracking
      ? <Image style={[styles.buttonImage]} source={require('../res/stop.png')} />
      : <Image style={[styles.buttonImage]} source={require('../res/start.png')} />

    return (
      <View style={styles.container}>
        <Logs
          onClose={this.setSettingsVisible.bind(this, false)}
          visible={this.state.settingsVisible}
          logFormatter={logFormatter}
        />
        <View style={styles.container}>
          <MapView
            style={{ height: height - styles.toolbar.height, width, flex: 1 }}
            region={this.state.region}
          >
          {this.state.locations.map(location => (
            <MapView.Marker
              key={location.key}
              coordinate={location}
              image={require('../res/TrackingDot.png')}
            />
          ))}
          </MapView>
        </View>
        <View style={[styles.toolbar, { width }]}>
          <View style={[styles.settingsButton]}>{/*just for centering*/}</View>
          <View style={[styles.startButton]}>
            <TouchableOpacity onPress={this.toggleTracking.bind(this)}>
              {Button}
            </TouchableOpacity>
          </View>
          <View style={[styles.settingsButton]}>
            <TouchableOpacity onPress={this.setSettingsVisible.bind(this, true)}>
              <Image style={[styles.buttonImage]} source={require('../res/settings.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


export default Map;
