/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityPropTypes,
} from 'react-native'

import { getAdjustedStyle } from './utilities'
/**
 * Simple component to be used in conjunction with HeaderRow component.
 *
 * Renders a title and if passed, a sorting icon.
 *
 * @param {String}       title                 Text to display in the cell
 * @param {String}       columnKey             The key for the column the cell heads.
 * @param {Func}         onPressAction         Action for dispatching on press
 * @param {Func}         dispatch              Dispatcher to backing reducer
 * @param {ReactElement} SortAscComponent      Icon component for ascending sorting
 * @param {ReactElement} SortDescComponent     Icon component for descending sorting
 * @param {ReactElement} SortNeutralComponent  Icon component for neutral state, no sort.
 * @param {Object}       containerStyle        Style object for the wrapping Touchable or View.
 * @param {Object}       textStyle             Style object for the inner Text component.
 * @param {Number}       width                 Optional flex property to inject into styles.
 * @param {Bool}         isLastCell            Indicator for if this cell is the last
 *                                             in a row. Removing the borderRight if true.
 */
const HeaderCell = React.memo(
  ({
    title,
    columnKey,
    sortDirection,
    SortAscComponent,
    SortDescComponent,
    SortNeutralComponent,
    onPressAction,
    dispatch,
    sortable,
    containerStyle,
    textStyle,
    width,
    isLastCell,
    ...otherProps
  }) => {
    const onPress = () => {
      dispatch(onPressAction(columnKey))
    }

    const Icon = () => {
      switch (sortDirection) {
        case 'ASC': {
          return SortAscComponent
        }
        case 'DESC': {
          return SortDescComponent
        }
        default: {
          return SortNeutralComponent
        }
      }
    }

    const Container = onPressAction ? TouchableOpacity : View

    const internalContainerStyle = getAdjustedStyle(
      containerStyle,
      width,
      isLastCell
    )

    return (
      <Container
        style={internalContainerStyle}
        onPress={onPress}
        {...otherProps}
      >
        <Text style={textStyle}>{title}</Text>
        {sortable && <Icon />}
      </Container>
    )
  }
)

HeaderCell.propTypes = {
  ...TouchableOpacityPropTypes,
  title: PropTypes.string.isRequired,
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onPressAction: PropTypes.func,
  dispatch: PropTypes.func,
  sortDirection: PropTypes.oneOf(['ASC', 'DESC']),
  SortAscComponent: PropTypes.element,
  SortDescComponent: PropTypes.element,
  SortNeutralComponent: PropTypes.element,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  width: PropTypes.number,
  sortable: PropTypes.bool,
  isLastCell: PropTypes.bool,
}

HeaderCell.defaultProps = {
  dispatch: null,
  onPressAction: null,
  sortDirection: null,
  SortAscComponent: null,
  SortDescComponent: null,
  SortNeutralComponent: null,
  containerStyle: {},
  textStyle: {},
  sortable: false,
  width: 0,
  isLastCell: false,
}

export default HeaderCell
