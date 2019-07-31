/**
 * Table experiment hole
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useCallback, useReducer } from 'react'
import { Button, StatusBar } from 'react-native'
import { DataTable } from './components/DataTable'
import { Row } from './components/Row'
import { Cell } from './components/Cell'
import { EditableCell } from './components/EditableCell'

// Configurable constants for demo data
const rowCount = 10
const columnCount = 4

const baseData = []
const baseColumns = []

// Make columns definition used in demo app
for (let index = 0; index < columnCount; index++) {
  baseColumns.push({ key: `col${index}`, editable: index === columnCount - 1 }) // index === columnCount - 1
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

// Reducers
const dataReducer = (data, action) => {
  switch (action.type) {
    case 'editCell':
      const { value, rowKey, columnKey } = action
      const rowIndex = data.findIndex(row => keyExtractor(row) === rowKey)

      // Immutable array editing so only the row/cell edited are re-rendered.
      // If you don't do this, every row will re-render as well as the cell
      // edited.
      return data.map((row, index) => {
        if (index !== rowIndex) {
          return row
        }
        const rowEdited = { ...row }
        rowEdited[columnKey] = value
        return rowEdited
      })
    case 'reverseData':
      return [...data.reverse()]
    default:
      return data
  }
}

// Actions
const editCell = (value, rowKey, columnKey) => ({
  type: 'editCell',
  value,
  rowKey,
  columnKey,
})

const useFocusNext = () => {} // TODO: ?????

const App = () => {
  const [isButtonOof, toggleButton] = useState(false)
  const [currentFocusedCell, setCurrentFocusedCell] = useState({
    currRow: null,
    currCol: null,
  })
  const [data, dataDispatch] = useReducer(dataReducer, baseData)
  const columns = baseColumns

  const _focusCell = useCallback(
    (rowKey, colKey) =>
      setCurrentFocusedCell({ currRow: rowKey, currCol: colKey }),
    []
  )

  const _focusNextCell = useCallback(
    (rowKey, colKey) => {
      // Handle finding next cell to focus
      let nextEditableColKey
      const currentColIndex = columns.findIndex(col => col.key === colKey)
      for (let index = currentColIndex + 1; index < columns.length; index++) {
        if (columns[index].editable) {
          nextEditableColKey = columns[index].key
          break
        }
      }

      if (nextEditableColKey) {
        // Focus next editable cell in row
        setCurrentFocusedCell({
          currRow: rowKey,
          currCol: nextEditableColKey,
        })
      } else {
        // Attempt moving focus to next row
        const nextRowIndex =
          data.findIndex(row => keyExtractor(row) === rowKey) + 1
        if (nextRowIndex <= data.length) {
          // Focus first editable cell in next row
          const nextRowKey = keyExtractor(data[nextRowIndex])
          const firstEditableColKey = columns.find(col => col.editable).key
          setCurrentFocusedCell({
            currRow: nextRowKey,
            currCol: firstEditableColKey,
          })
        } else {
          // We were on the last row, so unfocus current cell
          setCurrentFocusedCell({ currRow: null, currCol: null })
        }
      }
    },
    [data, columns]
  )

  const _renderCells = useCallback(
    (rowData, focusedCell, rowKey) => {
      return columns.map(col => {
        if (col.editable) {
          const { currRow, currCol } = focusedCell
          const { key: colKey } = col
          return (
            <EditableCell
              key={colKey}
              value={rowData[colKey]}
              rowKey={rowKey}
              columnKey={colKey}
              editAction={editCell}
              isFocused={rowKey === currRow && colKey === currCol}
              dataDispatch={dataDispatch}
              focusCell={_focusCell}
              focusNextCell={_focusNextCell}
            />
          )
        }
        return <Cell key={col.key} value={rowData[col.key]} />
      })
    },
    [columns, _focusNextCell, _focusCell]
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
          focusedCell={currentFocusedCell}
        />
      )
    },
    [data, _renderCells, currentFocusedCell]
  )

  return (
    <Fragment>
      <StatusBar hidden />
      <Button
        title={'sort data'}
        onPress={() => dataDispatch({ type: 'reverseData' })}
      />
      <Button
        title={isButtonOof ? 'oof' : 'Press me'}
        onPress={() => toggleButton(!isButtonOof)}
      />
      <DataTable
        data={data}
        extraData={currentFocusedCell}
        renderRow={_renderRow}
        keyExtractor={keyExtractor}
      />
    </Fragment>
  )
}

export default App
