/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.isExpanded,
    };
    this.onPress = this.onPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isExpanded !== this.state.isExpanded) {
      this.setState({ isExpanded: nextProps.isExpanded });
    }
  }

  onPress() {
    this.setState({ isExpanded: !this.state.isExpanded });
    this.props.onPress();
  }

  render() {
    const { style, expandedRowStyle, children, renderExpansion, onPress, ...touchableOpacityProps } = this.props;
    const rowStyle = this.state.isExpanded && expandedRowStyle ? expandedRowStyle : style;
    if (renderExpansion) {
      return (
        <TouchableOpacity
          {...touchableOpacityProps}
          style={[defaultStyles.row, rowStyle]}
          onPress={this.onPress}
        >
          <View style={defaultStyles.cellContainer}>
            {children}
          </View>
          {this.state.isExpanded && renderExpansion()}
        </TouchableOpacity>
      );
    }
    if (onPress) {
      return (
        <TouchableOpacity
          {...touchableOpacityProps}
          style={[defaultStyles.row, { flexDirection: 'row' }, rowStyle]}
          onPress={this.onPress}
        >
          {children}
        </TouchableOpacity>
      );
    }
    return (
      <View style={[defaultStyles.row, { flexDirection: 'row' }, rowStyle]}>
        {children}
      </View>
    );
  }
}

Row.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.any,
  onPress: PropTypes.func,
  isExpanded: PropTypes.bool,
  renderExpansion: PropTypes.func,
};

const defaultStyles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#d6f3ff',
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
