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

const rowCount = 200
const columnCount = 4
const baseData = []
const baseColumns = []

for (let index = 0; index < columnCount; index++) {
  baseColumns.push({ key: `col${index}`, editable: false }) // index === columnCount - 1
}

for (let index = 0; index < rowCount; index++) {
  const rowValues = {}
  baseColumns.forEach((column, columnIndex) => {
    rowValues[column.key] = `row${index}Col${columnIndex}`
  })

  baseData.push({ id: `r${index}`, ...rowValues })
}

/**
 * =============================================================================
 * Below is the stuff. I think we'll probably need to use table context to tidy
 * up keyExtractor and dataReducer. Then we're basically using redux LOL.
 *
 * # TODO:
 * - Context for reducer to tidy up?
 * - Styling/theme context (rather than passing through style props)?
 * - Different Cell types as individual components? Pros/cons? (e.g. EditableCell, TableButton...)
 * - So, every different cell type needs an reducer action?
 * - Custom Cells?
 * - How to drill down a row (UX guy pls HALP!!!)
 * - Horizontal scrolling support!
 * - Anything to do with extraData prop...? (calculated fields? Row states/highlighting!?)
 * - Is the dataDispatch prop easily given a redux dispatch? That'd be really nice.
 * - HeaderRow/Cells. ListHeaderComponent? Sort icons/render props? Adjustable widths?
 * - ListFooterComponent?
 * - Start taking performance metrics
 * - Optimising the table via default props for VirtualisedList (e.g. getItemLayout, maxToRenderPerBatch, updateCellsBatchingPeriod, removeClippedSubviews...)
 * - Unit testing table to ensure no regressions on what triggers rerenders
 *
 * # Notes
 * If and only if the table is bigger than the viewport (say 500 rows):
 * - sorting can hammer row rerender (quite shit with 5000 rows): Simply has to if data range is totally out of currently rendered viewport
 *
 * More than ~40 TextInputs in table (i.e. Editable column) causes crashes https://github.com/facebook/react-native/issues/17530#issuecomment-416367184
 *
 * There have been requests for better support of reactXP and react-native-web (e.g. aria accessibility).
 * I think that depending on what VirtualisedList is ported to, this may be a gross misuse
 * of this package. Should implement native HTML for web based IMO.
 * =============================================================================
 */

const keyExtractor = item => item.id // TODO: Should be default prop
const dataReducer = (data, action) => {
  switch (action.type) {
    case 'editRowCell':
      const { newValue, rowKey, columnKey } = action
      const rowIndex = data.findIndex(row => keyExtractor(row) === rowKey)

      // Immutable array editing
      return data.map((row, index) => {
        if (index !== rowIndex) {
          return row
        }
        const rowEdited = { ...row }
        rowEdited[columnKey] = newValue
        return rowEdited
      })
    case 'reverseData':
      return [...data.reverse()]
    default:
      return data
  }
}

const App = () => {
  const [isButtonOof, toggleButton] = useState(false)
  const [data, dataDispatch] = useReducer(dataReducer, baseData) // TODO: add to a context?
  const columns = baseColumns

  const renderCells = useCallback(
    (rowData, rowKey) => {
      return columns.map(col => (
        <Cell
          key={col.key}
          value={rowData[col.key]}
          rowKey={rowKey}
          columnKey={col.key}
          editable={col.editable}
          dataDispatch={dataDispatch}
        />
      ))
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