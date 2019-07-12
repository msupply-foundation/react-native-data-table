/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState } from 'react'
import {
  VirtualizedList,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native'

const rowCount = 30
const columnCount = 4
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

/**
 * =============================================================================
 * Below is the stuff
 * =============================================================================
 * =============================================================================
 * =============================================================================
 */

class Cell extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id)
  }

  render() {
    const textColor = this.props.selected ? 'red' : 'black'
    console.log(this.props.title)
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class DataTable extends React.PureComponent {
  state = { selected: new Map() }

  _keyExtractor = (item, index) => item.id

  _onPressItem = id => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected)
      selected.set(id, !selected.get(id)) // toggle
      return { selected }
    })
  }

  _renderItem = ({ item }) => {
    return (
      <Cell
        id={item.id}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        title={item.col1}
      />
    )
  }

  render() {
    return (
      <VirtualizedList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
      />
    )
  }
}

const App = () => {
  const [data, setData] = useState(baseData)
  const [isButtonRed, toggleButton] = useState(false)

  const onReverseData = () => setData([...data.reverse()])
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <Button title={'sort data'} onPress={() => onReverseData()} />
      <Button
        title={isButtonRed ? 'oof' : 'Press me'}
        // color={isButtonRed ? 'red' : 'blue'}
        onPress={() => toggleButton(!isButtonRed)}
      />
      <DataTable data={data} />
    </Fragment>
  )
}

export default App
