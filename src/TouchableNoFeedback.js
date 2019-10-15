/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2019
 */

import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

/**
 * TouchableWithoutFeedback doesn't have a style prop. View doesn't have an onPress
 * Prop. This hack ensures events don't propogate to the parent, styling stays consistent
 * and no feedback (i.e. gesture echo) is given to the user.
 */
const onPressNoOp = () => {}

const TouchableNoFeedback = ({ children, style, ...touchableProps }) => (
  <TouchableWithoutFeedback {...touchableProps} onPress={onPressNoOp}>
    <View style={style}>{children}</View>
  </TouchableWithoutFeedback>
)

TouchableNoFeedback.defaultProps = {
  style: null,
}

TouchableNoFeedback.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.object,
}

export default TouchableNoFeedback
