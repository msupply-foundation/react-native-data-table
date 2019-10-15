import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'

/**
 * Renders a row of children as outputted by renderCells render prop
 *
 * @param {func}   renderCells renderProp callBack for rendering cells based on rowData and rowState
 * @param {Object} style   Style object for the wrapping View component
 */
const HeaderRow = React.memo(({ renderCells, style }) => (
  <View style={style}>{renderCells()}</View>
))

HeaderRow.propTypes = {
  renderCells: PropTypes.func.isRequired,
  style: PropTypes.object,
}

HeaderRow.defaultProps = {
  style: {},
}

export default HeaderRow
