import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Cell = React.memo(({ value }) => {
  console.log(`- Cell: ${value}`)
  return (
    <View style={defaultStyles.cell}>
      <Text>{value}</Text>
    </View>
  )
})

const defaultStyles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
})
