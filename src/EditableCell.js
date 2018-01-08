/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TextInput,
  View,
  ViewPropTypes,
} from 'react-native';

export class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'N/A',
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
  }

  componentWillMount() {
    this.setState({
      value: String(this.props.value),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: String(nextProps.value),
      });
    }
  }

  onEndEditing() {
    // If the field is cleared, write null to property
    const newValue = this.state.value === '' ? null : this.state.value;
    this.props.onEndEditing(this.props.target, newValue);
  }

  render() {
    const { style, width, textStyle, refCallback, ...textInputProps } = this.props;
    return (
      <View style={[defaultStyles.cell, style, { flex: width }]}>
        <TextInput
          {...textInputProps}
          ref={refCallback}
          style={[defaultStyles.text, textStyle]}
          onChangeText={(text) => this.setState({ value: text })}
          onEndEditing={this.onEndEditing}
          value={this.state.value}
        />
      </View>
    );
  }
}

EditableCell.propTypes = {
  style: ViewPropTypes.style,
  refCallback: PropTypes.func,
  textStyle: TextInput.propTypes.style,
  width: PropTypes.number,
  onEndEditing: PropTypes.func,
  target: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

EditableCell.defaultProps = {
  width: 1,
  value: 'N/A',
};

const defaultStyles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    right: -9, // This is to account for RN issue 1287, see https://github.com/facebook/react-native/issues/1287
  },
});
