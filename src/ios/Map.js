'use strict';

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  MapView,
  Dimensions,
} from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Logs from '../common/Logs';
import logFormatter from '../utils/iosLogFormatter';

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
      annotations: [],
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
      const currentLocations = this.state.annotations.slice(0);
      let locationsCount = currentLocations.length;

      locations.forEach((location, idx) => {
        if ((now - location.time) <= sameDayDiffInMillis) {
          region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
          const histLocation = Object.assign({}, location, {
            key: locationsCount++,
            image: require('../res/TrackingDot.png')
          });
          console.log('[DEBUG] historic location', histLocation.key);
          currentLocations.push(histLocation);
        }
      });
      if (currentLocations.length > 0) {
        this.setState({ annotations: currentLocations, region });
      }
    }

    BackgroundGeolocation.getLocations(handleHistoricLocations.bind(this), logError);
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      debug: true,
      stopOnTerminate: false,
      interval: 10000,
      url: 'http://192.168.81.15:3000/locations',
      httpHeaders: {
        'X-FOO': 'bar'
      }
    }, function () {});

    BackgroundGeolocation.on('stationary', (location) => {
      console.log('[DEBUG] BackgroundGeolocation stationary location', location);
      const longitudeDelta = 0.01;
      const latitudeDelta = 0.01;
      const region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
      const annotations = this.state.annotations.slice(0);
      annotations.push(Object.assign({}, location, {
        key: locationsCount++,
        image: require('../res/TrackingDot.png')
      }));
      this.setState({ annotations, region });
      BackgroundGeolocation.finish();
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      const longitudeDelta = 0.01;
      const latitudeDelta = 0.01;
      const region = Object.assign({}, location, { latitudeDelta, longitudeDelta });
      const annotations = this.state.annotations.slice(0);
      annotations.push(Object.assign({}, location, { image: require('../res/TrackingDot.png') }));
      this.setState({ annotations, region });
      BackgroundGeolocation.finish();
    });
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

    BackgroundGeolocation.start(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');
    });
    this.setState({ isTracking: true });
  }

  stopTracking() {
    if (!this.state.isTracking) { return; }

    BackgroundGeolocation.stop();
    this.setState({ isTracking: false });
  }

  setSettingsVisible(visible) {
    this.setState({ settingsVisible: visible });
  }

  render() {
    var { height, width } = Dimensions.get('window');
    var Button = this.state.isTracking
      ? <Image style={styles.button} source={require('../res/stop.png')} />
      : <Image style={styles.button} source={require('../res/start.png')} />

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
            annotations={this.state.annotations}
          />
        </View>
        <View style={[styles.toolbar, { width }]}>
          <View style={[styles.space, { width: width/2 - 20}]}>{/*just for centering*/}</View>
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
