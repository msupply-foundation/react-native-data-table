import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityPropTypes,
} from 'react-native'

export const TouchableCell = React.memo(
  ({
    value,
    rowKey,
    columnKey,
    onPressAction,
    dispatch,
    children,
    renderChildren,
    CellComponent,
    ...otherProps
  }) => {
    console.log(`- TouchableCell: ${rowKey},${columnKey}`)

    const onPress = () => {
      dispatch(onPressAction(rowKey, columnKey))
    }

    const Container = CellComponent ? CellComponent : TouchableOpacity
    const content = renderChildren ? (
      renderChildren(value)
    ) : (
      <Text>{value}</Text>
    )

    return (
      <Container
        style={defaultStyles.touchableCell}
        onPress={onPress}
        {...otherProps}
      >
        {content}
      </Container>
    )
  }
)

TouchableCell.propTypes = {
  ...TouchableOpacityPropTypes,
}

TouchableCell.defaultProps = {
  width: 1,
}

const defaultStyles = StyleSheet.create({
  touchableCell: {
    flex: 1,
    backgroundColor: 'turquoise',
    justifyContent: 'center',
  },
})
