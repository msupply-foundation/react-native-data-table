/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';

export function Header(props) {
  const { children, style, ...viewProps } = props;
  return (
    <View {...viewProps} style={[defaultStyles.header, style]}>
      {children}
    </View>
  );
}

Header.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.any,
};

const defaultStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: 'grey',
  },
});
