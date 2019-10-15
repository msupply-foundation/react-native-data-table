import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'

import TouchableNoFeedback from './TouchableNoFeedback'

import RefContext from './RefContext'

/**
 * Renders a row of children as outputted by renderCells render prop
 * Tap gesture events will be captured in this component for any taps
 * on cells within this container which do not handle the event themselves.
 *
 * onFocus on a child will scroll the underlying list to this row.
 *
 * @param {object}        rowData     Data to pass to renderCells callback
 * @param {string|number} rowKey      Unique key associated to row
 * @param {object}        rowState    State to pass to renderCells callBack
 * @param {func}          onPress     function to call on pressing the row.
 * @param {object}        viewStyle   Style object for the wrapping View component
 * @param {boolean}       debug       Set to `true` to console.log(`Row: ${rowKey}`)
 * @param {number}        rowIndex    index of this row within DataTable.
 * @param {func}          renderCells renderProp callBack for rendering cells
 *                                    based on rowData and rowState
 *                                    `(rowKey, columnKey) => {...}`
 */
const Row = React.memo(
  ({
    rowData,
    rowState,
    rowKey,
    renderCells,
    style,
    onPress,
    debug,
    rowIndex,
  }) => {
    if (debug) {
      console.log('=================================')
      console.log(`Row: ${rowKey}`)
    }

    const { adjustToTop } = useContext(RefContext)
    const onPressRow = useCallback(() => onPress(rowData), [onPress, rowData])
    const onFocus = () => adjustToTop(rowIndex)

    const Container = onPress ? TouchableOpacity : TouchableNoFeedback
    return (
      <Container onPress={onPressRow} style={style} onFocus={onFocus}>
        {renderCells(rowData, rowState, rowKey, rowIndex)}
      </Container>
    )
  }
)

Row.propTypes = {
  rowData: PropTypes.any.isRequired,
  rowState: PropTypes.any,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  renderCells: PropTypes.func.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func,
  debug: PropTypes.bool,
  rowIndex: PropTypes.number.isRequired,
}

Row.defaultProps = {
  rowState: null,
  style: {},
  onPress: null,
  debug: true,
}

export default Row
