/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
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
    const { style, width, textStyle, refCallback, cellWidth, ...textInputProps } = this.props;
    return (
      <View style={[defaultStyles.cell, style, { flex: width, minWidth: cellWidth || 0 }]}>
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
  style: View.propTypes.style,
  refCallback: React.PropTypes.func,
  textStyle: TextInput.propTypes.style,
  width: React.PropTypes.number,
  cellWidth: React.PropTypes.number,
  onEndEditing: React.PropTypes.func,
  target: React.PropTypes.object,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
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
