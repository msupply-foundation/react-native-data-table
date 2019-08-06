import React from 'react'
import { View, StyleSheet } from 'react-native'

export const Row = ({ rowData, rowState, rowKey, renderCells }) => {
  console.log(`Row: ${rowKey}`)

  return (
    <View style={defaultStyles.row}>
      {renderCells(rowData, rowState, rowKey)}
    </View>
  )
}

const defaultStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})
