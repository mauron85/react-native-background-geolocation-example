import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View,Spinner} from 'native-base';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
    }
});

class Preloader extends Component {
    render() {
        return (
            <View style={styles.center}>
                <Spinner/>
            </View>
        );
    }
}

export default Preloader;
