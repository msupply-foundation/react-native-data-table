import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, StyleSheet, ViewPropTypes } from 'react-native'

export const Cell = React.memo(
  ({ value, rowKey, columnKey, editable, dataDispatch }) => {
    const _onEdit = newValue =>
      dataDispatch({ type: 'editRowCell', newValue, rowKey, columnKey })

    console.log(`cell: ${value}`)
    return (
      <View style={defaultStyles.cell}>
        {editable ? (
          <TextInput value={value} onChangeText={_onEdit} />
        ) : (
          <Text>{value}</Text>
        )}
      </View>
    )
  }
)

Cell.propTypes = {
  ...ViewPropTypes,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  width: PropTypes.number,
}

Cell.defaultProps = {
  width: 1,
}

const defaultStyles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
})
