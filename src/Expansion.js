/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import { View } from 'react-native';

export function Expansion(props) {
  const { children, style, ...viewProps } = props;
  return (
    <View {...viewProps} style={style}>
      {children}
    </View>
  );
}

Expansion.propTypes = {
  style: View.propTypes.style,
  children: React.PropTypes.any,
};
