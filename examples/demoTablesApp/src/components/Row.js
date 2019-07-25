import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

export const Row = React.memo(
  ({ rowData, rowKey, renderCells, dataDispatch }) => {
    console.log('====================================')
    console.log(`Row: ${rowKey}`)
    console.log('====================================')

    return <View style={defaultStyles.row}>{renderCells(rowData, rowKey)}</View>
  }
)

Row.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.any,
  onPress: PropTypes.func,
  isExpanded: PropTypes.bool,
  renderExpansion: PropTypes.func,
}

const defaultStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})
