import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'
import { Cell } from './Cell'

export const Row = React.memo(({ rowData, rowKey, columns, dataDispatch }) => {
  console.log('====================================')
  console.log(`Row: ${rowKey}`)
  console.log('====================================')

  return (
    <View style={defaultStyles.row}>
      {columns.map(col => (
        <Cell
          key={col.key}
          value={rowData[col.key]}
          rowKey={rowKey}
          columnKey={col.key}
          editable={col.editable}
          dataDispatch={dataDispatch}
        />
      ))}
    </View>
  )
})

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
