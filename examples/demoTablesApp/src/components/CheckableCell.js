import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacityPropTypes } from 'react-native'

import { TouchableCell } from './TouchableCell'

export const CheckableCell = React.memo(
  ({
    rowKey,
    columnKey,
    isChecked,
    CheckedComponent,
    UncheckedComponent,
    disabled,
    onCheckAction,
    onUncheckAction,
    dispatch,
  }) => {
    console.log(`- CheckableCell: ${rowKey},${columnKey}`)

    const _onPressAction = isChecked ? onUncheckAction : onCheckAction

    const _renderCheck = () =>
      isChecked ? (
        <CheckedComponent disabled={disabled} />
      ) : (
        <UncheckedComponent disabled={disabled} />
      )

    return (
      <TouchableCell
        renderChildren={_renderCheck}
        rowKey={rowKey}
        columnKey={columnKey}
        onPressAction={_onPressAction}
        dispatch={dispatch}
      />
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
