/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2019
 */

/**
 * Context of values relating to focus and scrolling with refs.
 *
 * Provider is DataTable.js - see for details.
 * Consumers are any editable cell and each row.
 * Context shape:
 * {
 *   getRefIndex,
 *   getCellRef,
 *   focusNextCell,
 *   adjustToTop,
 * }
 *
 */

import React from 'react'

const RefContext = React.createContext()

export default RefContext
