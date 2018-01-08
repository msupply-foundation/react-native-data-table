
/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
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
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  children: PropTypes.any,
};

const defaultStyles = StyleSheet.create({
  tableButton: {
    flex: 1,
  },
});
