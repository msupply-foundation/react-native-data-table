import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

const RowComponent = ({ rowData, rowState, rowKey, renderCells }) => {
  console.log(`Row: ${rowKey}`)

  return (
    <View style={defaultStyles.row}>
      {renderCells(rowData, rowState, rowKey)}
    </View>
  )
}

export const Row = React.memo(RowComponent)

Row.propTypes = {
  // style: ViewPropTypes.style,
  // onPress: PropTypes.func,
}

const defaultStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})
