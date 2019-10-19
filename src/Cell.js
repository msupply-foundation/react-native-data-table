/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { getAdjustedStyle } from './utilities'

/**
 * Renders a cell that displays a string/number value within
 * a react-native `Text` component.
 *
 * @param {string|number} value      The value to render in cell
 * @param {Object}        viewStyle  Style object for the containing View
 * @param {Object}        textStyle  Style object for the inner Text
 * @param {Number}        width      optional flex property to inject into styles.
 * @param {Bool}          isLastCell Indicator for if this cell is the last
 * @param {Number}        maxLiens   Maximum number of lines for the Text component
 *                                   in a row. Removing the borderRight if true.
 */
const Cell = React.memo(
  ({ value, textStyle, viewStyle, width, isLastCell, maxLines, debug }) => {
    if (debug) console.log(`- Cell: ${value}`)
    const internalViewStyle = getAdjustedStyle(viewStyle, width, isLastCell)

    return (
      <View style={internalViewStyle}>
        <Text ellipsizeMode="tail" numberOfLines={maxLines} style={textStyle}>
          {value}
        </Text>
      </View>
    )
  }
)

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textStyle: PropTypes.object,
  viewStyle: PropTypes.object,
  width: PropTypes.number,
  isLastCell: PropTypes.bool,
  maxLines: PropTypes.number,
  debug: PropTypes.bool,
}

Cell.defaultProps = {
  value: '',
  textStyle: {},
  viewStyle: {},
  width: 0,
  isLastCell: false,
  maxLines: 2,
  debug: false,
}

export default Cell
