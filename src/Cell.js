/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * Renders a Cell that supports having a string as children, or any component.
 * @param   {object}  props         Properties passed where component was created.
 * @prop    {StyleSheet} style      Style of the Cell (View props)
 * @prop    {StyleSheet} textStyle  Style of the text in the Cell
 * @prop    {number} width          Flexbox flex property, gives weight to the Cell width
 * @prop    {string}  text          Text to render in Cell
 * @return  {React.Component}       A single View with children
 */
export function Cell(props) {
  const { style, numberOfLines, textStyle, width, children, cellWidth, ...viewProps } = props;

  // Render string child in a Text Component
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <View {...viewProps} style={[defaultStyles.cell, style, { flex: width , minWidth: cellWidth || 0}]}>
        <Text numberOfLines={numberOfLines} style={textStyle}>
          {children}
        </Text>
      </View>
    );
  }
  // Render any non-string child component(s)
  return (
    <View {...viewProps} style={[defaultStyles.cell, style, { flex: width, minWidth: cellWidth || 0 }]}>
      {children}
    </View>
  );
}

Cell.propTypes = {
  ...View.propTypes,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  width: React.PropTypes.number,
  cellWidth: React.PropTypes.number,
  children: React.PropTypes.any,
  numberOfLines: React.PropTypes.number,
};

Cell.defaultProps = {
  width: 1,
  numberOfLines: 1,
};

const defaultStyles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
});
