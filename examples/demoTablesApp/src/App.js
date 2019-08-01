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

// Configurable constants for demo data
const rowCount = 200
const columnCount = 10

const baseData = []
const baseColumns = []

// Make columns definition used in demo app
for (let index = 0; index < columnCount; index++) {
  baseColumns.push({ key: `col${index}`, editable: index > columnCount - 5 }) // index === columnCount - 1
}

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
    case 'focusThisCell': {
      const { rowKey, columnKey } = action
      const focusedCell = {
        currRow: rowKey,
        currCol: columnKey,
      }
      return { ...state, focusedCell }
    }
    case 'focusNextCell': {
      const { data, columns } = state
      const { rowKey, columnKey } = action
      let focusedCell
      // Handle finding next cell to focus
      let nextEditableColKey
      const currentColIndex = columns.findIndex(col => col.key === columnKey)
      for (let index = currentColIndex + 1; index < columns.length; index++) {
        if (columns[index].editable) {
          nextEditableColKey = columns[index].key
          break
        }
      }

      if (nextEditableColKey) {
        // Focus next editable cell in row
        focusedCell = {
          currRow: rowKey,
          currCol: nextEditableColKey,
        }
      } else {
        // Attempt moving focus to next row
        const nextRowIndex =
          data.findIndex(row => keyExtractor(row) === rowKey) + 1

        if (nextRowIndex < data.length) {
          // Focus first editable cell in next row
          const nextRowKey = keyExtractor(data[nextRowIndex])
          const firstEditableColKey = columns.find(col => col.editable).key
          focusedCell = {
            currRow: nextRowKey,
            currCol: firstEditableColKey,
          }
        } else {
          // We were on the last row, so unfocus current cell
          focusedCell = { currRow: null, currCol: null }
        }
      }
      return { ...state, focusedCell }
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

const focusThis = (rowKey, columnKey) => ({
  type: 'focusThisCell',
  rowKey,
  columnKey,
})

const focusNext = (rowKey, columnKey) => ({
  type: 'focusNextCell',
  rowKey,
  columnKey,
})

const App = () => {
  const startTime = Date.now()

  const [isButtonOof, toggleButton] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    data: baseData,
    columns: baseColumns,
    focusedCell: {
      currRow: null,
      currCol: null,
    },
  })
  const { data, columns, focusedCell } = state

  const _renderCells = useCallback(
    (rowData, rowKey, currCell) => {
      const { currRow, currCol } = currCell
      return columns.map(col => {
        if (col.editable) {
          const { key: colKey } = col
          return (
            <EditableCell
              key={colKey}
              value={rowData[colKey]}
              rowKey={rowKey}
              columnKey={colKey}
              editAction={editCell}
              isFocused={rowKey === currRow && colKey === currCol}
              dispatch={dispatch}
              focusAction={focusThis}
              focusNextAction={focusNext}
            />
          )
        }
        return <Cell key={col.key} value={rowData[col.key]} />
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
          rowKey={rowKey}
          renderCells={_renderCells}
          focusedCell={focusedCell}
        />
      )
    },
    [data, _renderCells, focusedCell]
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
