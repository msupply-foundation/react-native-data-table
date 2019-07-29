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

// Configurable constants for demo data volume
const rowCount = 100
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

// Action yay
const editCell = (value, rowKey, columnKey) => ({
  type: 'editCell',
  value,
  rowKey,
  columnKey,
})

const App = () => {
  const [isButtonOof, toggleButton] = useState(false)
  const [data, dataDispatch] = useReducer(dataReducer, baseData)
  const columns = baseColumns

  const renderCells = useCallback(
    (rowData, rowKey) => {
      return columns.map(col => {
        if (col.editable) {
          return (
            <EditableCell
              key={col.key}
              value={rowData[col.key]}
              rowKey={rowKey}
              columnKey={col.key}
              editAction={editCell}
              dataDispatch={dataDispatch}
            />
          )
        }
        return <Cell key={col.key} value={rowData[col.key]} />
      })
    },
    [columns, dataDispatch]
  )

  const renderItem = useCallback(
    ({ item, index }) => {
      const rowKey = keyExtractor(item)
      return (
        <Row
          rowData={data[index]}
          rowKey={rowKey}
          renderCells={renderCells}
          dataDispatch={dataDispatch}
        />
      )
    },
    [data, renderCells, dataDispatch]
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
        renderRow={renderItem}
        keyExtractor={keyExtractor}
      />
    </Fragment>
  )
}

export default App
