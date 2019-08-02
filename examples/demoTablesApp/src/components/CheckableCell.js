import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityPropTypes,
} from 'react-native'

export const CheckableCell = React.memo(
  ({ value, children, renderChildren, CellComponent, ...otherProps }) => {
    console.log(`- CheckableCell: ${value}`)

    const Cell = CellComponent ? CellComponent : TouchableOpacity
    const content = renderChildren ? (
      renderChildren(value)
    ) : (
      <Text>{value}</Text>
    )

    return (
      <Cell style={defaultStyles.checkableCell} {...otherProps}>
        {content}
      </Cell>
    )
  }
)

CheckableCell.propTypes = {
  ...TouchableOpacityPropTypes,
}

CheckableCell.defaultProps = {
  width: 1,
}

const defaultStyles = StyleSheet.create({
  checkableCell: {
    flex: 1,
    backgroundColor: 'cyan',
    justifyContent: 'center',
  },
})
