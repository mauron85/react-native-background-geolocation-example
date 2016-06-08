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
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      debug: true,
      stopOnTerminate: false,
      interval: 10000,
      url: 'http://192.168.81.15:3000/location',
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
