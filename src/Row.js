/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import {
  View,
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
    const { style, children, renderExpansion, onPress, ...touchableOpacityProps } = this.props;
    if (renderExpansion) {
      return (
        <TouchableOpacity
          {...touchableOpacityProps}
          style={[defaultStyles.row, style]}
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
          style={[defaultStyles.row, { flexDirection: 'row' }, style]}
          onPress={this.onPress}
        >
          {children}
        </TouchableOpacity>
      );
    }
    return (
      <View style={[defaultStyles.row, { flexDirection: 'row' }, style]}>
        {children}
      </View>
    );
  }
}

Row.propTypes = {
  style: View.propTypes.style,
  children: React.PropTypes.any,
  onPress: React.PropTypes.func,
  isExpanded: React.PropTypes.bool,
  renderExpansion: React.PropTypes.func,
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
