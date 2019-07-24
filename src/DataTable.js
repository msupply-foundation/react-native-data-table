/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  VirtualizedList,
  VirtualizedListPropTypes,
} from 'react-native'

export const DataTable = React.memo(({ renderRow, ...otherProps }) => (
  <VirtualizedList
    style={defaultStyles.virtualizedList}
    renderItem={renderRow}
    {...otherProps}
  />
))

DataTable.propTypes = {
  ...VirtualizedListPropTypes,
  listViewStyle: PropTypes.object,
  refCallback: PropTypes.func,
  renderHeader: PropTypes.func,
  renderRow: PropTypes.func.isRequired,
}
DataTable.defaultProps = {}

const defaultStyles = StyleSheet.create({
  virtualizedList: {
    flex: 1,
  },
})
