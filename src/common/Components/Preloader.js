import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Spinner} from 'native-base';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center'
    }
});

const Preloader = () => {
  return (
      <View style={styles.center}>
          <Spinner/>
      </View>
  );
};

export default Preloader;
