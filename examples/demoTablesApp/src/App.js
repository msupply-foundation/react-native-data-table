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
import { Button, StatusBar } from 'react-native'
import { DataTable } from './components/DataTable'
import { Row } from './components/Row'
import { Cell } from './components/Cell'
import { EditableCell } from './components/EditableCell'
import { TouchableCell } from './components/TouchableCell'

// Configurable constants for demo data
const rowCount = 200

const baseData = []
const baseColumns = [
  { key: 1, type: 'cell' },
  { key: 2, type: 'cell' },
  { key: 3, type: 'cell' },
  { key: 4, type: 'touchable' },
  { key: 5, type: 'editable' },
  { key: 6, type: 'editable' },
]

// Generate data for use in demo app
for (let index = 0; index < rowCount; index++) {
  const rowValues = {}
  baseColumns.forEach((column, columnIndex) => {
    rowValues[column.key] = `row${index}Col${columnIndex}`
  })

  baseData.push({ id: `r${index}`, ...rowValues })
}

const keyExtractor = item => item.id

// Reducer for managing DataTable state
const reducer = (state, action) => {
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
    case 'focusNone': {
      // Clear currently focused Cell
      const { dataState, currentFocusedRowKey } = state
      const newDataState = new Map(dataState)

      const currentRowState = newDataState.get(currentFocusedRowKey)
      newDataState.set(currentFocusedRowKey, {
        ...currentRowState,
        focusedColumn: null,
      })

      return { ...state, dataState: newDataState }
    }
    case 'focusCell': {
      // Clear any existing focus and focus cell specified in action
      const { rowKey, columnKey } = action
      const { dataState, currentFocusedRowKey } = state
      let newDataState

      if (currentFocusedRowKey && rowKey !== currentFocusedRowKey) {
        newDataState = reducer(state, focusNone()).dataState
      } else {
        newDataState = new Map(dataState)
      }

      // Update focusedColumn in specified row
      const nextRowState = newDataState.get(rowKey)
      newDataState.set(rowKey, {
        ...nextRowState,
        focusedColumn: columnKey,
      })

      return { ...state, dataState: newDataState, currentFocusedRowKey: rowKey }
    }
    case 'focusNextCell': {
      const { data, columns } = state
      const { rowKey, columnKey } = action
      let nextCell = [null, null]
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
        nextCell = [rowKey, nextEditableColKey]
      } else {
        // Attempt moving focus to next row
        const nextRowIndex =
          data.findIndex(row => keyExtractor(row) === rowKey) + 1

        if (nextRowIndex < data.length) {
          // Focus first editable cell in next row
          const nextRowKey = keyExtractor(data[nextRowIndex])
          const firstEditableColKey = columns.find(
            col => col.type === 'editable'
          ).key
          nextCell = [nextRowKey, firstEditableColKey]
        } else {
          // We were on the last row and last column, so unfocus current cell
          return reducer(state, focusNone())
        }
      }
      return reducer(state, focusCell(...nextCell))
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

const focusNone = () => ({
  type: 'focusNone',
})

const selectRow = (rowKey, columnKey) => ({
  type: 'focusNextCell',
  rowKey,
  columnKey,
})

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
                focusAction={focusCell}
                focusNextAction={focusNext}
                dispatch={dispatch}
              />
            )
          case 'touchable':
            return (
              <TouchableCell
                key={colKey}
                value={rowData[colKey]}
                rowKey={rowKey}
                columnKey={colKey}
                selected
                onPressAction={selectRow}
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
