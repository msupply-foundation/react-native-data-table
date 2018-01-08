/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

export function Expansion(props) {
  const { children, style, ...viewProps } = props;
  return (
    <View {...viewProps} style={style}>
      {children}
    </View>
  );
}

Expansion.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.any,
};
