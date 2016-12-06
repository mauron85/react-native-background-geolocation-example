import React from 'react';
import {StyleSheet,View,Text,TextInput} from 'react-native';

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
    inputText: {
      flex: 1,
      fontSize: 15,
      textAlign: 'right',
    },
});

const Input = ({ label, value, ...inputProps }) => {
  return (
    <View style={styles.group}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.input}>
        <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputText}
            {...inputProps}
            value={String(value || '')}
        />
      </View>
    </View>
  );
};

export default Input;
