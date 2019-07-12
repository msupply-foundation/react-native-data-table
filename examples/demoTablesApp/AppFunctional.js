/**
 * Table experiment hole
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useReducer } from 'react'
import {
  VirtualizedList,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native'

const rowCount = 40
const columnCount = 4
const baseData = []
const baseColumns = []

for (let index = 0; index < columnCount; index++) {
  baseColumns.push({ key: `col${index}`, editable: index === columnCount - 1 }) // index === columnCount - 1
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
 * If and only if the table is bigger than the viewport (say 500 rows):
 * - scrolling hammers row rerender
 * - sorting hammers row rerender
 * - Might be premature optimising the above?
 *
 * More than ~40 TextInputs in table (i.e. Editable column) causes crashes https://github.com/facebook/react-native/issues/17530#issuecomment-416367184
 *
 * =============================================================================
 * =============================================================================
 * =============================================================================
 */

const Cell = React.memo(
  ({ value, rowKey, columnKey, editable, dataDispatch }) => {
    const _onEdit = newValue =>
      dataDispatch({ type: 'editRowCell', newValue, rowKey, columnKey })

    console.log(value)
    return (
      <View style={styles.cell}>
        {editable ? (
          <TextInput value={value} onChangeText={_onEdit} />
        ) : (
          <Text>{value}</Text>
        )}
      </View>
    )
  }
)

const Row = React.memo(({ listItem, columns, dataDispatch, keyExtractor }) => {
  const { item } = listItem
  const rowKey = keyExtractor(item)
  // TODO: Editing still rerenders every row. Not sure if we can defeat that.
  console.log('====================================')
  console.log(`Row: ${rowKey}`)
  console.log('====================================')
  return (
    <View style={styles.row}>
      {columns.map(col => (
        <Cell
          key={col.key}
          value={listItem.item[col.key]}
          rowKey={rowKey}
          columnKey={col.key}
          editable={col.editable}
          dataDispatch={dataDispatch}
        />
      ))}
    </View>
  )
})

const DataTable = React.memo(
  ({ data, keyExtractor, dataDispatch, ...otherProps }) => {
    const _renderItem = listItem => {
      return (
        <Row
          listItem={listItem}
          columns={baseColumns}
          dataDispatch={dataDispatch}
          keyExtractor={keyExtractor}
        />
      )
    }

    return (
      <VirtualizedList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={_renderItem}
        getItemCount={items => items.length} // TODO: Should be prop
        getItem={(items, index) => items[index]} // TODO: Should be prop
        {...otherProps}
      />
    )
  }
)

// TODO: This is janky being out here, needs to go in the api
const keyExtractor = item => item.id
// TODO: This should also be in api somehow
const dataReducer = (data, action) => {
  switch (action.type) {
    case 'editRowCell':
      const { newValue, rowKey, columnKey } = action
      const newData = [...data]
      const rowIndex = newData.findIndex(row => keyExtractor(row) === rowKey)
      newData[rowIndex][columnKey] = newValue
      return newData
    case 'reverseData':
      return [...data.reverse()]
    default:
      return data
  }
}

const App = () => {
  const [data, dataDispatch] = useReducer(dataReducer, baseData)
  // TODO: extraData to use its own `useReducer`?
  const [isButtonOof, toggleButton] = useState(false)

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
        keyExtractor={keyExtractor}
        dataDispatch={dataDispatch}
        removeClippedSubviews
      />
    </Fragment>
  )
}

export default App

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
  },
  row: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  table: {
    flex: 1,
  },
})
