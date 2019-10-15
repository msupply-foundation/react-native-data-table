import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, TouchableOpacityPropTypes } from 'react-native'

import TouchableNoFeedback from './TouchableNoFeedback'

import { getAdjustedStyle } from './utilities'

/**
 * Renders a cell with value (or renderChildren) that is touchable
 *
 * @param {string|number} value              The value to render in cell
 * @param {string|number} rowKey             Unique key associated to row cell is in
 * @param {string|number} columnKey          Unique key associated to column cell is in
 * @param {func}          onPressAction      Action creator for handling focusing of this cell.
 *                                           `(rowKey, columnKey) => {...}`
 * @param {func}          dispatch           Reducer dispatch callback for handling actions
 * @param {func}          renderChildren     Reducer dispatch callback for handling actions
 * @param {func}          TouchableComponent Override containing element of TouchableCell
 *                                           Additional props spread into TouchableComponent
 * @param {object}        containerStyle     Style object for the containing Touchable component
 * @param {object}        textStyle          Style object for the inner Text component
 * @param {Number}        width              Optional flex property to inject into styles.
 * @param {Bool}          isLastCell         Indicator for if this cell is the last
 *                                           in a row. Removing the borderRight if true.
 */
const TouchableCell = React.memo(
  ({
    value,
    rowKey,
    columnKey,
    onPressAction,
    dispatch,
    renderChildren,
    TouchableComponent,
    containerStyle,
    width,
    textStyle,
    isLastCell,
    debug,
    isDisabled,
    ...otherProps
  }) => {
    if (debug) console.log(`- TouchableCell: ${rowKey},${columnKey}`)

    const onPress = () => dispatch(onPressAction(rowKey, columnKey))

    const internalContainerStyle = getAdjustedStyle(
      containerStyle,
      width,
      isLastCell
    )
    const Container = isDisabled
      ? TouchableNoFeedback
      : TouchableComponent || TouchableOpacity
    const content = renderChildren ? (
      renderChildren(value)
    ) : (
      <Text style={textStyle}>{value}</Text>
    )

    return (
      <Container
        style={internalContainerStyle}
        onPress={onPress}
        {...otherProps}
      >
        {content}
      </Container>
    )
  }
)

TouchableCell.propTypes = {
  ...TouchableOpacityPropTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onPressAction: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  renderChildren: PropTypes.func.isRequired,
  TouchableComponent: PropTypes.node,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  isLastCell: PropTypes.bool,
  width: PropTypes.number,
  debug: PropTypes.bool,
  isDisabled: PropTypes.bool,
}

TouchableCell.defaultProps = {
  value: '',
  containerStyle: {},
  textStyle: {},
  TouchableComponent: null,
  isLastCell: false,
  width: 0,
  debug: false,
  isDisabled: false,
}

export default TouchableCell
