/* @flow weak */

/**
 * mSupply Mobile
 * Sustainable Solutions (NZ) Ltd. 2016
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Renders a headerCell that supports being a plain View with Text or being a TouchableOpacity (with
 * callback). In the latter case Sort arrows will be rendered and controlled with isSelected and
 * isAscending props.
 * @param   {object}  props         Properties passed where component was created.
 * @prop    {boolean} isSelected    When false up+down sort arrows renderHeader, otherwise as below
 * @prop    {boolean} isAscending   Sort arrow up if true, down if false.
 * @prop    {StyleSheet} style      Style of the headerCell (View props)
 * @prop    {StyleSheet} textStyle  Style of the text in the HeaderCell
 * @prop    {number} width          flexbox flex property, gives weight to the headerCell width
 * @prop    {func} onPress          CallBack (should change sort order in parent)
 * @prop    {string}  text          Text to render in headerCell
 * @return  {React.Component}       Return TouchableOpacity with sort arrows if onPress is given a
 *                                  function. Otherwise return a View.
 */

export function HeaderCell(props) {
  const {
    style,
    textStyle,
    width,
    onPress,
    text,
    isSelected,
    isAscending,
    arrowStyle,
    ...containerProps,
  } = props;

  function renderSortArrow() {
    if (isSelected) {
      // isAscending = true = a to z
      if (isAscending) return <Icon name="sort-asc" size={16} style={[defaultStyles.icon, arrowStyle]} />;
      return <Icon name="sort-desc" size={16} style={[defaultStyles.icon, arrowStyle]} />;
    }
    return <Icon name="sort" size={16} style={[defaultStyles.icon, arrowStyle]} />;
  }

  if (typeof onPress === 'function') {
    return (
      <TouchableOpacity
        {...containerProps}
        style={[defaultStyles.headerCell, style, { flex: width }]}
        onPress={onPress}
      >
        <Text style={textStyle}>
          {text}
        </Text>
        {renderSortArrow()}
      </TouchableOpacity>
    );
  }
  return (
    <View {...containerProps} style={[defaultStyles.headerCell, style, { flex: width }]}>
      <Text style={textStyle}>
        {text}
      </Text>
    </View>
  );
}

HeaderCell.propTypes = {
  isSelected: React.PropTypes.bool,
  isAscending: React.PropTypes.bool,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  arrowStyle: Text.propTypes.style,
  width: React.PropTypes.number,
  onPress: React.PropTypes.func,
  text: React.PropTypes.string,
};

HeaderCell.defaultProps = {
  width: 1,
};

const defaultStyles = StyleSheet.create({
  headerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
  },
});
