import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'

import Cell from './Cell'
import RefContext from './RefContext'

import { getAdjustedStyle } from './utilities'

/**
 * Renders a cell that on press or focus contains a TextInput for
 * editing values.
 *
 * @param {string|number} value      The value to render in cell
 * @param {string|number} rowKey     Unique key associated to row cell is in
 * @param {string|number} columnKey  Unique key associated to column cell is in
 * @param {bool} isDisabled          If `true` will render a plain Cell element with no interaction
 * @param {String} placeholderColour Placholder text colour
 * @param {func}  dispatch           Reducer dispatch callback for handling actions
 * @param {Object}  viewStyle        Style object for the wrapping View component
 * @param {Object}  textStyle        Style object for the inner Text component
 * @param {Object}  textInputStyle   Style object for TextInput component.
 * @param {Number}  width            Optional flex property to inject into styles.
 * @param {bool}    debug            Logs rendering of this component.
 * @param {string}  keyboardType     Type of keyboard for the TextInput.
 * @param {string}  placeholder      placeholder text
 * @param {Object} cellTextStyle     text style for the disabled Cell component.
 * @param {Bool}  isLastCell         Indicator if this cell is last in a row,
 *                                   removing the borderRight,
 * @param {func}  editAction         Action creator for handling editing of this cell.
 *                                   `(newValue, rowKey, columnKey) => {...}`
 * @param {String} underlineColor    Underline colour of TextInput on Android.
 */
const TextInputCell = React.memo(
  ({
    value,
    rowKey,
    columnKey,
    isDisabled,
    placeholderColour,
    editAction,
    dispatch,
    isLastCell,
    width,
    debug,
    keyboardType,
    placeholder,
    viewStyle,
    rowIndex,
    textInputStyle,
    cellTextStyle,
    underlineColor,
  }) => {
    if (debug) console.log(`- TextInputCell: ${value}`)

    const usingPlaceholder = placeholder && !value

    const { focusNextCell, getRefIndex, getCellRef } = React.useContext(
      RefContext
    )
    const refIndex = getRefIndex(rowIndex, columnKey)

    const onEdit = newValue => dispatch(editAction(newValue, rowKey, columnKey))
    const focusNext = () => focusNextCell(refIndex)

    // Render a plain Cell if disabled.
    if (isDisabled) {
      return (
        <Cell
          key={columnKey}
          viewStyle={viewStyle}
          textStyle={cellTextStyle}
          value={value}
          width={width}
          isLastCell={isLastCell}
        />
      )
    }

    const internalViewStyle = getAdjustedStyle(viewStyle, width, isLastCell)
    const internalTextStyle = getAdjustedStyle(textInputStyle, width)

    // Render a Cell with a textInput.
    return (
      <View style={internalViewStyle}>
        <TextInput
          ref={getCellRef(refIndex)}
          placeholder={placeholder}
          style={internalTextStyle}
          value={usingPlaceholder ? '' : String(value)}
          placeholderTextColor={placeholderColour}
          onChangeText={onEdit}
          onSubmitEditing={focusNext}
          underlineColorAndroid={underlineColor}
          keyboardType={keyboardType}
          blurOnSubmit={false}
        />
      </View>
    )
  }
)

TextInputCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isDisabled: PropTypes.bool,
  placeholderColour: PropTypes.string,
  editAction: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  cellTextStyle: PropTypes.object,
  viewStyle: PropTypes.object,
  width: PropTypes.number,
  textInputStyle: PropTypes.object,
  isLastCell: PropTypes.bool,
  debug: PropTypes.bool,
  placeholder: PropTypes.string,
  rowIndex: PropTypes.number.isRequired,
  underlineColor: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
}

TextInputCell.defaultProps = {
  value: '',
  isDisabled: false,
  viewStyle: {},
  cellTextStyle: {},
  textInputStyle: {},
  isLastCell: false,
  width: 0,
  debug: false,
  keyboardType: 'numeric',
  placeholder: '',
  placeholderColour: '#CDCDCD',
  underlineColor: '#CDCDCD',
}

export default TextInputCell
