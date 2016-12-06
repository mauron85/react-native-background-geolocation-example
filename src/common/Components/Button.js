import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  InteractionManager,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A69FE'
  },
  btnLabel: {
    fontSize: 15,
    color: '#fff',
  },
});

const Button = ({
  type,
  children,
  style,
  onPress,
}) => (
  <TouchableHighlight
    style={[styles.btn, style]}
    onPress={() => {
      InteractionManager.runAfterInteractions(() => {
        onPress();
      });
    }}
  >
    <Text style={styles.btnLabel}>{children}</Text>
  </TouchableHighlight>
);

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.number,
  onPress: PropTypes.func,
};

export default Button;
