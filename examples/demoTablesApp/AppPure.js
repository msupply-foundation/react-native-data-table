/**
 * @format
 * @flow
 */

import React, { Fragment, useState } from 'react'
import {
  StyleSheet,
  View,
  VirtualizedList,
  Text,
  TextInput,
  StatusBar,
  Button,
} from 'react-native'

const rowCount = 25
const columnCount = 10
const baseData = []
const columns = []

for (let index = 0; index < columnCount; index++) {
  columns.push({ key: `col${index}`, editable: index === 1 })
}

for (let index = 0; index < rowCount; index++) {
  const rowValues = {}
  columns.forEach((column, columnIndex) => {
    rowValues[column.key] = `row${index}Col${columnIndex}`
  })

  baseData.push({ id: `r${index}`, ...rowValues })
}

const Cell = React.memo(props => {
  const onChangeText = text => props.onEdit(text, props.rowKey, props.columnKey)
  console.log('cellRow ' + props.rowKey)
  return (
    <View style={styles.cell}>
      {props.editable ? (
        <TextInput value={props.data} onChangeText={onChangeText} />
      ) : (
        <Text>{props.data}</Text>
      )}
    </View>
  )
})

const Row = React.memo(props => (
  <View style={styles.row}>{props.children}</View>
))

const DataTable = React.memo(props => {
  const { data, extraData, keyExtractor, renderRow } = props
  return (
    <VirtualizedList
      style={styles.table}
      data={data}
      extraData={extraData}
      keyExtractor={keyExtractor}
      renderItem={renderRow}
      getItem={(items, index) => items[index]}
      getItemCount={items => items.length}
    />
  )
})

const App = () => {
  const [data, setData] = useState(baseData)
  const [extraData, setExtraData] = useState(new Map())
  const [isButtonRed, toggleButton] = useState(false)

  const onEdit = (value, row, column) => {
    const newData = new Map(extraData)
    const rowEdits = newData.get(row) || {}
    rowEdits[column] = value
    newData.set(row, rowEdits)
    setExtraData(newData)
  }

  const onSaveData = (value, row, column) => {
    const newData = [...data]
    newData[row][column] = value
    setData(newData)
  }

  const onReverseData = () => setData([...data.sort((a, b) => a.id < b.id)])
  const keyExtractor = row => row.id
  const renderRow = row => {
    const { item, index } = row
    return (
      <Row>
        {columns.map(col => (
          <Cell
            key={col.key}
            data={item[col.key]}
            rowKey={index}
            columnKey={col.key}
            editable={col.editable}
            onEdit={onEdit}
          />
        ))}
      </Row>
    )
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <Button title={'reverse data'} onPress={() => onReverseData()} />
      <Button
        title={isButtonRed ? 'oof' : 'Press me'}
        color={isButtonRed ? 'red' : 'blue'}
        onPress={() => toggleButton(!isButtonRed)}
      />
      <DataTable
        data={data}
        extraData={extraData}
        keyExtractor={keyExtractor}
        renderRow={renderRow}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
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

export default App

// class Cell extends React.PureComponent {
//   render() {
//     return (
//       <View style={styles.cell}>
//         <Text>{this.props.data}</Text>
//       </View>
//     );
//   }
// }

// class Row extends React.PureComponent {
//   render() {
//     return <View style={styles.row}>{this.props.children}</View>
//   }
// }

// const App = () => {
//   const [data, setData] = useState(baseData)
//   const [isButtonRed, toggleButton] = useState(false)

//   onEdit = (value, row, column) => {
//     const newData = [...data]
//     newData[row][column] = value
//     setData(newData)
//   }

//   onReverseData = () => setData([...data.sort((a, b) => a.id < b.id)])

//   keyExtractor = row => row.id

//   renderRow = (row) => {
//     const { item, index } = row

//     return (
//       <Row>
//         {columns.map(col => (
//           <Cell
//             key={col.key}
//             data={item[col.key]}
//             rowKey={index}
//             // columnKey={col.key}
//             // editable={col.editable}
//             // onEdit={this.onEdit}
//           />
//         ))}
//       </Row>
//     )
//   }

//   return (
//     <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <Button
//         title={isButtonRed ? 'oof' : 'Press me'}
//         color={isButtonRed ? 'red' : 'blue'}
//         onPress={() => toggleButton(!isButtonRed)}
//       />
//       <Button
//         title={'reverse data'}
//         onPress={() => this.onReverseData()}
//       />
//       <VirtualizedList
//         style={{ flex: 1 }}
//         data={data}
//         keyExtractor={this.keyExtractor}
//         renderItem={this.renderRow}
//         getItem={(data, index) => data[index]}
//         getItemCount={data => data.length}
//         removeClippedSubviews
//       />
//     </Fragment>
//   );
// };

// class App extends React.PureComponent {
//   state = { data: baseData, isButtonRed: false }

//   onEdit = (value, row, column) => {
//     const newData = [...data]
//     newData[row][column] = value
//     setData(newData)
//   }

//   onReverseData = () => this.setState({ data: [...this.state.data.sort((a, b) => a.id < b.id)] })
//   toggleButton = () => this.setState({ isButtonRed: !this.state.isButtonRed })

//   keyExtractor = row => row.id

//   renderRow = (row) => {
//     const { item, index } = row

//     return (
//       <Row>
//         {columns.map(col => (
//           <Cell
//             key={col.key}
//             data={item[col.key]}
//             rowKey={index}
//             columnKey={col.key}
//             editable={col.editable}
//             onEdit={this.onEdit}
//           />
//         ))}
//       </Row>
//     )
//   }

//   render() {
//     const { data, isButtonRed } = this.state;
//     return (
//       <Fragment>
//         <StatusBar barStyle="dark-content" />
//         <Button
//           title={isButtonRed ? 'oof' : 'Press me'}
//           color={isButtonRed ? 'red' : 'blue'}
//           onPress={() => this.toggleButton(!isButtonRed)}
//         />
//         <Button
//           title={'reverse data'}
//           onPress={() => this.onReverseData()}
//         />
//         <VirtualizedList
//           style={{ flex: 1 }}
//           data={data}
//           keyExtractor={this.keyExtractor}
//           renderItem={this.renderRow}
//           getItem={(data, index) => data[index]}
//           getItemCount={data => data.length}
//           removeClippedSubviews
//         />
//       </Fragment>
//     );
//   }
// }
