import React from 'react';
import {StyleSheet,Text} from 'react-native';

const styles = StyleSheet.create({
    labelText: {
      fontSize: 15,
      color: '#000'
    },
});

const ListItemDivider = ({ label, children }) => {
  return (
    <Text style={styles.labelText}>{children}</Text>
  );
};

export default ListItemDivider;
