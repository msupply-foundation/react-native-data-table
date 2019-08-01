import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

const RowComponent = ({ rowData, rowKey, renderCells, focusedCell }) => {
  // console.log('====================================')
  console.log(`Row: ${rowKey}`)
  // console.log('====================================')

  return (
    <View style={defaultStyles.row}>
      {renderCells(rowData, rowKey, focusedCell)}
    </View>
  )
}

const areEqual = (prevProps, nextProps) => {
  if (
    Object.is(prevProps.rowData, nextProps.rowData) &&
    Object.is(prevProps.renderCells, nextProps.renderCells) &&
    Object.is(prevProps.rowKey, nextProps.rowKey) &&
    !Object.is(prevProps.rowKey, prevProps.focusedCell.currRow) && // subtle difference warning
    !Object.is(nextProps.rowKey, nextProps.focusedCell.currRow)
  ) {
    return true
  }
  return false
}

export const Row = React.memo(RowComponent, areEqual)

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
