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
  Platform,
} from 'react-native';

export function Header(props) {
  const { children, style, ...viewProps } = props;
  const webProps = Platform.OS === 'web' ? { "aria-header": true } : null;
  return (
    <View {...viewProps} {...webProps} style={[defaultStyles.header, style]}>
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
