import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native'

export const Cell = React.memo(({ value }) => {
  // console.log(`Cell: ${value}`)
  return (
    <View style={defaultStyles.cell}>
      <Text>{value}</Text>
    </View>
  )
})

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
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
})
