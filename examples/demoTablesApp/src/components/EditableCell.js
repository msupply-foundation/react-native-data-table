import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  StyleSheet,
  ViewPropTypes,
} from 'react-native'

import { Cell } from './Cell'

/**
 * Renders a cell that on press or focus contains a TextInput for
 * editing values.
 *
 * @param {string|number} value
 * @param {string|number} rowKey
 * @param {string|number} columnKey
 * @param {bool} disabled
 * @param {func} editAction
 * @param {func} dataDispatch
 */
export const EditableCell = React.memo(
  ({
    value,
    rowKey,
    columnKey,
    disabled,
    editAction,
    isFocused,
    dataDispatch,
    focusCell,
    focusNextCell,
  }) => {
    const _onEdit = newValue =>
      dataDispatch(editAction(newValue, rowKey, columnKey))

    const _focusCell = () => focusCell(rowKey, columnKey)
    const _focusNextCell = () => focusNextCell(rowKey, columnKey)

    console.log(`EditableCell: ${value}`)

    // Render a plain Cell if disabled.
    if (disabled) {
      return <Cell value={value} />
    }

    // Too many TextInputs causes React Native to crash, so only
    // truly mount the TextInput when the Cell is focused.
    // Use TouchableWithoutFeedback because we want the appearance and
    // feedback to resemble a TextInput regardless of focus.
    if (!isFocused) {
      return (
        <TouchableWithoutFeedback onPress={_focusCell}>
          <View style={defaultStyles.cell}>
            <Text>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    // Render a Cell with a textInput.
    return (
      <View style={defaultStyles.cell}>
        <TextInput
          style={defaultStyles.editableCell}
          value={value}
          onChangeText={_onEdit}
          autoFocus={isFocused}
          onSubmitEditing={_focusNextCell}
        />
      </View>
    )
  }
)

EditableCell.propTypes = {
  ...ViewPropTypes,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  width: PropTypes.number,
}

EditableCell.defaultProps = {
  width: 1,
  disabled: false,
  isFocused: false,
}

const defaultStyles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  editableCell: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
})
