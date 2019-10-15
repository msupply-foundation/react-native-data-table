/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2019
 */

import PropTypes from 'prop-types'
import React, { useMemo, useRef, useCallback } from 'react'
import {
  StyleSheet,
  VirtualizedList,
  VirtualizedListPropTypes,
  Keyboard,
} from 'react-native'
import RefContext from './RefContext'

/**
 * Base DataTable component. Wrapper around VirtualizedList, providing
 * a header component, scroll to top and focus features.
 * All VirtualizedList props can be passed through, however renderItem
 * is renamed renderRow.
 *
 * Managing focus and scrolling:
 * Can manage focusing and auto-scrolling for editable cells through react context API.
 *
 * Four parameters are passed in through the refContext:
 *
 * - `getRefIndex`   : Gets the ref index for an editable cell given the columnkey and row index.
 * - `getCellRef`    : Lazily creates a ref for a cell.
 * - `focusNextCell` : Focus' the next editable cell. Call during onEditingSubmit.
 * - `adjustToTop`   : Scrolls so the focused row is at the top of the list.
 *
 * @param {Func}   renderRow    Renaming of VirtualizedList renderItem prop.
 * @param {Func}   renderHeader Function which should return a header component
 * @param {Object} style        Style Object for this component.
 * @param {Object} data         Array of data objects.
 * @param {Object} columns      Array of column objects.
 */
const DataTable = React.memo(
  ({ renderRow, renderHeader, style, data, columns, ...otherProps }) => {
    // Reference to the virtualized list for scroll operations.
    const virtualizedListRef = useRef()

    // Array of column keys for determining ref indicies.
    const editableColumnKeys = useMemo(
      () =>
        columns.reduce((columnKeys, column) => {
          const { editable } = column
          if (editable) return [...columnKeys, column.key]
          return columnKeys
        }, []),
      [columns]
    )
    const numberOfEditableColumns = editableColumnKeys.length
    const numberOfRows = data.length
    const numberOfEditableCells = numberOfEditableColumns * numberOfRows

    // Array for each editable cell. Needs to be stable, but updates shouldn't cause re-renders.
    const cellRefs = useRef(Array.from({ length: numberOfEditableCells }))

    // Passes a cell it's ref index.
    const getRefIndex = (rowIndex, columnKey) => {
      const columnIndex = editableColumnKeys.findIndex(key => columnKey === key)

      return rowIndex * numberOfEditableColumns + columnIndex
    }

    // Callback for an editable cell. Lazily creating refs.
    const getCellRef = refIndex => {
      if (cellRefs.current[refIndex]) return cellRefs.current[refIndex]

      const newRef = React.createRef()
      cellRefs.current[refIndex] = newRef

      return newRef
    }

    // Focuses the next editable cell in the list. On the last row, dismiss the keyboard.
    const focusNextCell = refIndex => {
      const lastRefIndex = numberOfEditableCells - 1
      if (refIndex === lastRefIndex) return Keyboard.dismiss()

      const nextCellRef = (refIndex + 1) % numberOfEditableCells
      const cellRef = getCellRef(nextCellRef)

      return cellRef.current.focus()
    }

    // Adjusts the passed row to the top of the list.
    const adjustToTop = useCallback(rowIndex => {
      virtualizedListRef.current.scrollToIndex({ index: rowIndex })
    }, [])

    // Contexts values. Functions passed to rows and editable cells to control focus/scrolling.
    const contextValue = useMemo(
      () => ({
        getRefIndex,
        getCellRef,
        focusNextCell,
        adjustToTop,
      }),
      [numberOfEditableCells]
    )

    const renderItem = useCallback(
      rowItem => renderRow(rowItem, focusNextCell, getCellRef, adjustToTop),
      [renderRow]
    )

    return (
      <RefContext.Provider value={contextValue}>
        {renderHeader && renderHeader()}
        <VirtualizedList
          ref={virtualizedListRef}
          keyboardDismissMode="none"
          data={data}
          keyboardShouldPersistTaps="always"
          style={style}
          renderItem={renderItem}
          {...otherProps}
        />
      </RefContext.Provider>
    )
  }
)

const defaultStyles = StyleSheet.create({
  virtualizedList: {
    flex: 1,
  },
})

DataTable.propTypes = {
  ...VirtualizedListPropTypes,
  renderRow: PropTypes.func.isRequired,
  renderHeader: PropTypes.func,
  getItem: PropTypes.func,
  getItemCount: PropTypes.func,
  initialNumToRender: PropTypes.number,
  removeClippedSubviews: PropTypes.bool,
  windowSize: PropTypes.number,
  style: PropTypes.object,
  columns: PropTypes.array,
}

DataTable.defaultProps = {
  renderHeader: null,
  style: defaultStyles.virtualizedList,
  getItem: (items, index) => items[index],
  getItemCount: items => items.length,
  initialNumToRender: 10,
  removeClippedSubviews: true,
  windowSize: 3,
  columns: [],
}

export default DataTable
