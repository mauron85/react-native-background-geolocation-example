import React from 'react';
import {StyleSheet,View,Text,Switch as SwitchRN} from 'react-native';

const styles = StyleSheet.create({
    group: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      width: 150,
    },
    labelText: {
      fontSize: 15,
      color: '#000'
    },
    input: {
      flex: 1,
    },
    switchSelf: {
      alignSelf: 'flex-end',
    },
});

const Switch = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.group}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={[styles.input]}>
        <SwitchRN
          style={styles.switchSelf}
          value={Boolean(value)}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

export default Switch;
