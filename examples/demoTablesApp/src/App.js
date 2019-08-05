/**
 * Table experiment hole
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Fragment,
  useState,
  useCallback,
  useReducer,
  useLayoutEffect,
} from 'react'
import { Button, StatusBar, Text } from 'react-native'
import { DataTable } from './components/DataTable'
import { Row } from './components/Row'
import { Cell } from './components/Cell'
import { EditableCell } from './components/EditableCell'
import { CheckableCell } from './components/CheckableCell'

// Configurable constants for demo data
const rowCount = 20

const baseData = []
const baseColumns = [
  { key: 1, type: 'cell' },
  { key: 2, type: 'cell' },
  { key: 3, type: 'cell' },
  { key: 4, type: 'checkable' },
  { key: 5, type: 'editable' },
  { key: 6, type: 'editable' },
]

// Generate data for use in demo app
for (let index = 0; index < rowCount; index++) {
  const rowValues = {}
  baseColumns.forEach((column, columnIndex) => {
    rowValues[column.key] = `row${index}Col${columnIndex + 1}`
  })

  baseData.push({ id: `r${index}`, ...rowValues })
}

const keyExtractor = item => item.id

// Reducer for managing DataTable state
const reducer = (state, action) => {
  /**
   * Immutably clears the current focus
   * @param {object} currState  the copy of state you want affected
   * @return {object}           A new object with no cell focused
   */
  const clearFocus = currState => {
    const { dataState, currentFocusedRowKey } = currState
    if (!currentFocusedRowKey) {
      return currState
    }

    const newDataState = new Map(dataState)
    const currentRowState = newDataState.get(currentFocusedRowKey)
    newDataState.set(currentFocusedRowKey, {
      ...currentRowState,
      focusedColumn: null,
    })

    return { ...currState, dataState: newDataState, currentFocusedRowKey: null }
  }

  /**
   * Immutably sets the current focus to the cell identified by `rowKey` and `columnKey`
   * @param {object} currState  The copy of state to affect
   * @param {string} rowKey     The key of the row the cell to focus is in
   * @param {string} columnKey  The key of the column the cell to focus is in
   * @return {object}           A new object with a cell focused
   */
  const setFocus = (currState, rowKey, columnKey) => {
    const { dataState, currentFocusedRowKey } = currState
    let newDataState = new Map(dataState)

    // Clear previous focus if in a different row
    if (currentFocusedRowKey && rowKey !== currentFocusedRowKey) {
      const currentRowState = newDataState.get(currentFocusedRowKey)
      newDataState.set(currentFocusedRowKey, {
        ...currentRowState,
        focusedColumn: null,
      })
    }

    // Update focusedColumn in specified row
    const nextRowState = newDataState.get(rowKey)
    newDataState.set(rowKey, {
      ...nextRowState,
      focusedColumn: columnKey,
    })

    return {
      ...currState,
      dataState: newDataState,
      currentFocusedRowKey: rowKey,
    }
  }

  switch (action.type) {
    case 'editCell': {
      const { value, rowKey, columnKey } = action
      const { data } = state
      const rowIndex = data.findIndex(row => keyExtractor(row) === rowKey)

      // Immutable array editing so only the row/cell edited are re-rendered.
      // If you don't do this, every row will re-render as well as the cell
      // edited.
      const newData = data.map((row, index) => {
        if (index !== rowIndex) {
          return row
        }
        const rowEdited = { ...row }
        rowEdited[columnKey] = value
        return rowEdited
      })
      return { ...state, data: newData }
    }
    case 'reverseData':
      return { ...state, data: state.data.reverse() }
    case 'focusCell': {
      // Clear any existing focus and focus cell specified in action
      const { rowKey, columnKey } = action
      return setFocus(state, rowKey, columnKey)
    }
    case 'focusNextCell': {
      const { data, columns } = state
      const { rowKey, columnKey } = action

      // Handle finding next cell to focus
      let nextEditableColKey
      const currentColIndex = columns.findIndex(col => col.key === columnKey)
      for (let index = currentColIndex + 1; index < columns.length; index++) {
        if (columns[index].type === 'editable') {
          nextEditableColKey = columns[index].key
          break
        }
      }

      if (nextEditableColKey) {
        // Focus next editable cell in row
        return setFocus(state, rowKey, nextEditableColKey)
      }

      // Attempt moving focus to next row
      const nextRowIndex =
        data.findIndex(row => keyExtractor(row) === rowKey) + 1

      if (nextRowIndex < data.length) {
        // Focus first editable cell in next row
        const nextRowKey = keyExtractor(data[nextRowIndex])
        const firstEditableColKey = columns.find(col => col.type === 'editable')
          .key
        return setFocus(state, nextRowKey, firstEditableColKey)
      }

      // We were on the last row and last column, so unfocus current cell
      return clearFocus(state)
    }
    case 'selectRow': {
      const { dataState } = state
      const { rowKey } = action
      const newDataState = new Map(dataState)

      const nextRowState = newDataState.get(rowKey)
      newDataState.set(rowKey, {
        ...nextRowState,
        isSelected: true,
      })
      console.log('================sat====================')
      console.log(rowKey)
      console.log('====================================')
      return { ...state, dataState: newDataState }
    }
    case 'deselectRow': {
      const { dataState } = state
      const { rowKey } = action
      const newDataState = new Map(dataState)

      const nextRowState = newDataState.get(rowKey)
      newDataState.set(rowKey, {
        ...nextRowState,
        isSelected: false,
      })

      return { ...state, dataState: newDataState }
    }
    default:
      return state
  }
}

// Actions
const editCell = (value, rowKey, columnKey) => ({
  type: 'editCell',
  value,
  rowKey,
  columnKey,
})

const focusCell = (rowKey, columnKey) => ({
  type: 'focusCell',
  rowKey,
  columnKey,
})

const focusNext = (rowKey, columnKey) => ({
  type: 'focusNextCell',
  rowKey,
  columnKey,
})

const selectRow = rowKey => ({
  type: 'selectRow',
  rowKey,
})

const deselectRow = rowKey => ({
  type: 'deselectRow',
  rowKey,
})

const CheckedComponent = () => <Text>checked</Text>
const UncheckedComponent = () => <Text style={{ color: 'red' }}>unchecked</Text>
const DisabledCheckedComponent = () => (
  <Text style={{ color: 'grey' }}>checked disabled</Text>
)
const DisabledUncheckedComponent = () => (
  <Text style={{ color: 'grey' }}>unchecked disabled</Text>
)

const baseState = {
  data: baseData,
  dataState: new Map(),
  columns: baseColumns,
  currentFocusedRowKey: null,
}

const App = () => {
  const startTime = Date.now() // Delete me

  const [isButtonOof, toggleButton] = useState(false)
  const [state, dispatch] = useReducer(reducer, baseState)
  const { data, dataState, columns } = state

  const _renderCells = useCallback(
    (rowData, rowState = {}, rowKey) => {
      return columns.map(column => {
        const { key: colKey, type } = column
        switch (type) {
          case 'editable':
            return (
              <EditableCell
                key={colKey}
                value={rowData[colKey]}
                rowKey={rowKey}
                columnKey={colKey}
                editAction={editCell}
                isFocused={colKey === rowState.focusedColumn}
                disabled={rowState.disabled}
                focusAction={focusCell}
                focusNextAction={focusNext}
                dispatch={dispatch}
              />
            )
          case 'checkable':
            return (
              <CheckableCell
                key={colKey}
                rowKey={rowKey}
                columnKey={colKey}
                isChecked={rowState.isSelected}
                disabled={rowState.disabled}
                CheckedComponent={CheckedComponent}
                UncheckedComponent={UncheckedComponent}
                DisabledCheckedComponent={DisabledCheckedComponent}
                DisabledUncheckedComponent={DisabledUncheckedComponent}
                onCheckAction={selectRow}
                onUncheckAction={deselectRow}
                dispatch={dispatch}
              />
            )
          default:
            return <Cell key={colKey} value={rowData[colKey]} />
        }
      })
    },
    [columns]
  )

  const _renderRow = useCallback(
    listItem => {
      const { item, index } = listItem
      const rowKey = keyExtractor(item)
      return (
        <Row
          rowData={data[index]}
          rowState={dataState.get(rowKey)}
          rowKey={rowKey}
          renderCells={_renderCells}
        />
      )
    },
    [data, dataState, _renderCells]
  )

  useLayoutEffect(() => {
    console.log('===============Layout time=====================')
    console.log(Date.now() - startTime)
    console.log('====================================')
  })
  return (
    <Fragment>
      <StatusBar hidden />
      <Button
        title={'sort data'}
        onPress={() => dispatch({ type: 'reverseData' })}
      />
      <Button
        title={isButtonOof ? 'oof' : 'Press me'}
        onPress={() => toggleButton(!isButtonOof)}
      />
      <DataTable
        data={data}
        extraData={state}
        renderRow={_renderRow}
        keyExtractor={keyExtractor}
      />
    </Fragment>
  )
}

export default App
