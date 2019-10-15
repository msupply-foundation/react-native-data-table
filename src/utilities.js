/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2019
 */

/**
 * Utility method to inject properties into a provided style object.
 * If width is passed, add a flex property equal to width.
 * If isLastCell is passed, add a borderRightWidth: 0 property to remove
 * the border for the last cell in a row.
 * If neither are used, do nothing.
 *
 * @param {Object} style      Style object to inject styles into.
 * @param {Number} width      Value for the flex property to inject.
 * @param {Bool}   isLastCell Indicator for the cell being the last in a row.
 */
export const getAdjustedStyle = (style, width, isLastCell) => {
  if (width && isLastCell) return { ...style, flex: width, borderRightWidth: 0 }
  if (width) return { ...style, flex: width }
  if (isLastCell) return { ...style, borderWidth: 0 }
  return style
}
