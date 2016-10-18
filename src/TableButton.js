
/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export function TableButton(props) {
  const { style, onPress, children, ...touchableOpacityProps } = props;
  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[defaultStyles.tableButton, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

TableButton.propTypes = {
  style: View.propTypes.style,
  onPress: React.PropTypes.func,
  children: React.PropTypes.any,
};

const defaultStyles = StyleSheet.create({
  tableButton: {
    flex: 1,
  },
});
